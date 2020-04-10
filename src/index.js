import express from 'express';
import bodyParser from 'body-parser';
import responseTime from 'response-time';
import { performance } from 'perf_hooks';

import Estimator from './routes/estimator.route';
import { saveResponse } from './services/log.service';

// Create global App project
const app = express();

app.use(responseTime());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const modifyResponseBody = (request, response, next) => {
  const startTime = performance.now();
  const oldSend = response.send;

  response.send = function (data) {
    const endedTime = performance.now();

    const diff = endedTime - startTime;

    if (response.statusCode === 200 || response.statusCode === 201) {
      const log = {
        requestUrl: request.originalUrl,
        requestMethod: request.method,
        responseTime: diff,
        responseStatus: response.statusCode,
      };

      saveResponse(log);
    }

    response.send = oldSend;
    return response.send(data);
  };
  next();
};

app.use(modifyResponseBody);

app.get('/', (request, response) => {
  return response.status(200).send({
    message: 'welcome to covid-19 estimator API by Damilola Adekoya',
  });
});

app.get('/api/v1', (request, response) => {
  return response.status(200).send({
    message: 'Welcome to covid-19 estimator Backend API v1 By Damilola Adekoya',
  });
});

app.use('/api/v1/on-covid-19', Estimator);

app.use((request, response, next) => {
  const error = new Error('You are trying to access a wrong Route');
  error.status = 404;
  next(error);
});

// eslint-disable-next-line no-unused-vars
app.use((error, request, response, next) => {
  response.status(error.status || 500);
  response.json({
    status: error.status || 500,
    error: error.name,
    message: error.message,
  });
});

const PORT = process.env.PORT || 6000;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port: ${PORT}`);
});

export default app;
