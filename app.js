var createError = require('http-errors');
var express = require('express');
const expressLayouts = require('express-ejs-layouts');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const dashboardRouter = require('./routes/dashboard');
const categoriesRouter = require('./routes/categories');
const tagsRouter = require('./routes/tags');
const postsRouter = require('./routes/posts');
const structuralsRouter = require('./routes/structurals');
const memberPositionsRouter = require('./routes/member-positions');
const periodeRouter = require('./routes/periode');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60000},
  })
);
app.use(flash());
app.use(methodOverride('_method'))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Set Templating Engine
app.use(expressLayouts)
app.set('layout', './layouts/app')
app.set('view engine', 'ejs')

app.use('/', loginRouter);
app.use('/dashboard', dashboardRouter);
app.use('/categories', categoriesRouter);
app.use('/tags', tagsRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/structurals', structuralsRouter);
app.use('/member-positions', memberPositionsRouter);
app.use('/periode', periodeRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
