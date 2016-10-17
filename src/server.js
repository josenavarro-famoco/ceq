import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import methodOverride from 'method-override';
import cors from 'cors';

import graphqlHTTP from 'express-graphql';
import {
  buildSchema
} from 'graphql';
import Schema from './Schemas';

const app = express();

if (process.env.ENV === 'development') {
  app.use(logger('dev'));
}

// parse body params and attache them to req.body
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(cookieParser());
app.use(compress());
app.use(methodOverride());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

const PORT = process.env.PORT || 3000;
app.set('port', PORT);

import router from './api';

app.use('/api', router);
app.get('/', (req, res) => res.end('Hello World'));

app.use('/graphql', graphqlHTTP({
  schema: Schema,
  pretty: true,
  graphiql: true,
}));


// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (process.env.ENV === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message
  });
});

export default app;
