
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')

var app = express();

const corsOptions = {
	origin: 'http://localhost:3000',
	credentials: true,
	optionsSuccessStatus: 200,
}

app.use(cors(corsOptions));


app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	next();
  });

const indexRouter = require('./routes/index.js')
const usersRouter = require('./routes/users.js')
const articlesRouter = require('./routes/articles.js')
const commentsRouter = require('./routes/comments.js')
const categoriesRouter = require('./routes/categories.js')


  
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/articles', articlesRouter);
app.use('/comments', commentsRouter);
app.use('/categories', categoriesRouter);
app.use('/users', usersRouter);


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
