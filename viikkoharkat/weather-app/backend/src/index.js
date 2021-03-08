import 'babel-polyfill';
import Koa from 'koa';
import Router from 'koa-router';
import mysql from 'mysql2/promise';
import KoaBody from 'koa-bodyparser';
import Url from 'url';

// The port that this server will run on, defaults to 9000
const port = process.env.PORT || 8000;

// Instantiate a Koa server
const app = new Koa();
const koaBody = new KoaBody();

// Instantiate routers
const test = new Router();
const to_dos = new Router();

// Define API path
const apiPath = '/api/v1';

const connectionSettings = {
  host: 'db',
  user: 'root',
  database: 'tietokanta',
  password: 'db_rootpass',
  namedPlaceholders: true,
};

test.get(`${apiPath}/test`, async (ctx) => {
  try {
    const conn = await mysql.createConnection(connectionSettings);
    const [data] = await conn.execute(`
        SELECT *
        FROM test_table
      `);

    console.log('Data fetched:', data);

    // Tell the HTTP response that it contains JSON data encoded in UTF-8
    ctx.type = 'application/json; charset=utf-8';

    // Add stuff to response body
    ctx.body = { greeting: 'Hello world!', data };
  } catch (error) {
    console.error('Error occurred:', error);
    ctx.throw(500, error);
  }
  const url = Url.parse(ctx.url, true);
  const { sort } = url.query;

  const parseSortQuery = ({ urlSortQuery, whitelist }) => {
    let query = '';
    if (urlSortQuery) {
      const sortParams = urlSortQuery.split(',');

      query = 'ORDER BY ';
      sortParams.forEach((param, index) => {
        let trimmedParam = param;
        let desc = false;

        if (param[0] === '-') {
          // Remove the first character
          trimmedParam = param.slice(1);
          // Set descending to true
          desc = true;
        }

        // If parameter is not whitelisted, ignore it
        // This also prevents SQL injection even without statement preparation
        if (!whitelist.includes(trimmedParam)) return;

        // If this is not the first sort parameter, append ', '
        if (index > 0) query = query.concat(', ');

        // Append the name of the field
        query = query.concat(trimmedParam);

        if (desc) query = query.concat(' DESC');
      });
    }
    return query;
  };
  const orderBy = parseSortQuery({ urlSortQuery: sort, whitelist: ['id', 'text', 'done'] });

  try {
    const conn = await mysql.createConnection(connectionSettings);
    const [data] = await conn.execute(`
        SELECT *
        FROM todos
        ${orderBy}
      `);

    // Return all todos
    ctx.body = data;
  } catch (error) {
    console.error('Error occurred:', error);
    ctx.throw(500, error);
  }
});

// Middleware for checking accept headers
const checkAccept = async (ctx, next) => {
  console.log('checkAccept');
  // If client does not accept 'application/json' as response type, throw '406 Not Acceptable'
  if (!ctx.accepts('application/json')) {
    ctx.throw(406);
  }
  // Set the response content type
  ctx.type = 'application/json; charset=utf-8';
  // Move to next middleware
  await next();
};

// Middleware for checking request body content
const checkContent = async (ctx, next) => {
  console.log('checkContent');
  // Check that the request content type is 'application/json'
  if (!ctx.is('application/json')) {
    ctx.throw(415, 'Request must be application/json');
  }
  // Move to next middleware
  await next();
};

// Define todos paths
const todosPath = `${apiPath}/to_dos`;
const todoPath = `${todosPath}/:id`;

// GET /resource
to_dos.get(todosPath, checkAccept, async (ctx) => {
});

// GET /resource/:id
to_dos.get(todoPath, checkAccept, async (ctx) => {
});

// POST /resource
to_dos.post(todosPath, checkAccept, checkContent, koaBody, async (ctx) => {
  const { text } = ctx.request.body;
  console.log('.post text contains:', text);

  if (typeof text === 'undefined') {
    ctx.throw(400, 'body.text is required');
  } else if (typeof text !== 'string') {
    ctx.throw(400, 'body.done must be string');
  }

  try {
    const conn = await mysql.createConnection(connectionSettings);

    // Insert a new todo
    const [status] = await conn.execute(`
          INSERT INTO todos (text)
          VALUES (:text);
        `, { text });
    const { insertId } = status;

    // Get the new todo
    const [data] = await conn.execute(`
          SELECT *
          FROM todos
          WHERE id = :id;
        `, { id: insertId });

    // Set the response header to 201 Created
    ctx.status = 201;

    // Set the Location header to point to the new resource
    const newUrl = `${ctx.host}${Router.url(todoPath, { id: insertId })}`;
    ctx.set('Location', newUrl);

    // Return the new todo
    ctx.body = data[0];
  } catch (error) {
    console.error('Error occurred:', error);
    ctx.throw(500, error);
  }
});

// PUT /resource/:id
to_dos.put(todoPath, checkAccept, checkContent, koaBody, async (ctx) => {
});

// DELETE /resource/:id
to_dos.del(todoPath, async (ctx) => {
});


app.use(test.routes());
app.use(test.allowedMethods());
app.use(to_dos.routes());
app.use(to_dos.allowedMethods());

// Start the server and keep listening on port until stopped
app.listen(port);

console.log(`App listening on port ${port}`);
