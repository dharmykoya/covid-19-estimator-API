import xml from 'xml2js';
import { getAllLog, deleteLog } from '../services/log.service';

export default {
  /**
   * @method getEstimate
   * @description get estimated results
   * Route: GET: /on-covid-19
   * @param {Object} request request object
   * @param {Object} response request object
   * @returns {Response} response object
   */

  async getLogs(request, response) {
    const result = await getAllLog();
    return response.status(200).format({
      'text/plain': function () {
        response.send(result);
      },
    });
  },

  async deleteLogs(request, response) {
    const result = await deleteLog();
    return response.status(202).send({
      message: true,
    });
  },
};
