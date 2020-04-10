import model from '../database/models/index';
import { restart } from 'nodemon';
import { response } from 'express';

const { ResponseLog } = model;

export const saveResponse = async (data) => {
  const { requestUrl, requestMethod, responseTime, responseStatus } = data;
  let newTime = Math.trunc(Math.ceil(responseTime));
  if (newTime <= 9) {
    newTime = `0${newTime}`;
  }
  const queryResult = await ResponseLog.create({
    requestUrl,
    requestMethod,
    responseTime: newTime,
    responseStatus,
  });

  return true;
};

export const getAllLog = async (data) => {
  const result = await ResponseLog.findAll({
    attributes: [
      'id',
      'requestUrl',
      'requestMethod',
      'responseTime',
      'responseStatus',
      'createdAt',
    ],
  });

  let response = '';
  result
    .map((res) => res.dataValues)
    .map((a) => {
      if (a.requestMethod === 'GET') {
        response += `${a.requestMethod}\t\t\t${a.requestUrl}\t\t${a.responseStatus}\t\t${a.responseTime}ms\n`;
      } else {
        response += `${a.requestMethod}\t\t${a.requestUrl}\t\t${a.responseStatus}\t\t${a.responseTime}ms\n`;
      }
    });

  return response.substring(0, response.length - 1);
};

export const deleteLog = async () => {
  ResponseLog.destroy({
    where: {},
    truncate: true,
  });

  return true;
};
/* if (a.requestMethod === 'GET') {
  response += `${a.requestMethod}\t\t\t${a.requestUrl}\t\t${
    a.responseStatus
  }\t\t${Number(a.responseTime).toFixed(1)}ms\n`;
} else {
  response += `${a.requestMethod}\t\t${a.requestUrl}\t\t${
    a.responseStatus
  }\t\t${Number(a.responseTime, '').toFixed(0)}ms\n`;
} */
