const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = requrie('@koa/cors');
const userRouter = require('./routes/userRoutes');

const app = new Koa();

app.use(cors());
app.use(bodyParser());
app.use(userRouter.routes());

module.exports = app;