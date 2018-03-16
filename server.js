const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const auth = require('koa-basic-auth');
const db = require('./db');
const validate = require('./utils').validate;

const app = new Koa();
const router = new Router();
const port = process.env.port || 3000;

// Set routes
router.get('/', async (ctx) => {
  ctx.status = 200;
  ctx.set('Content-type', 'text/plain');
  const text = 'Welcome to the comments server home\nCurrently, only two endpoints are available: "/comments" and "/comments/{id}"\nPlease visit one of these endpoints to get started';
  ctx.body = text;
});

router.get('/comments', async (ctx) => {
  const { user } = ctx.query;
  const comments = user ? db.getCommentsByUser(user) : db.getAllComments();
  ctx.status = 200;
  ctx.set('Content-type', 'application/json');
  ctx.body = comments;
});

router.get('/comments/:id', async (ctx) => {
  const comment = db.getComment(ctx.params.id);
  if (comment) {
    ctx.status = 200;
    ctx.set('Content-type', 'application/json');
    ctx.body = comment;
  } else ctx.throw(404, 'The requested comment does not exist');
});

router.post('/comments', async (ctx) => {
  const commentState = validate(db.getAllComments(), ctx.request.body);
  if (commentState.valid) {
    db.setComment(ctx.request.body);
    ctx.status = 201;
    ctx.set('Content-type', 'text/plain');
    ctx.body = 'Successfully posted comment';
  } else ctx.throw(400, commentState.message);
});

// Authorization middlewwre
app.use(async (ctx, next) => {
  const { authorization } = ctx.request.headers;
  if (!authorization) {
    ctx.set('WWW-Authenticate', 'Basic');
    ctx.throw(401, 'User authentication required');
  }
  const decoded = Buffer.from(authorization.split(' ')[1], 'base64').toString('ascii');
  db.getUser(decoded) ? await next() : ctx.throw(401, 'Invalid username and/or password');
})

app
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

//Start server on 3000
app.listen(port, () => {
  process.stdout.write(`Server running on localhost:${port}`);
});
