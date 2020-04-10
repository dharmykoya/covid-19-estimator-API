import xml from 'xml2js';
import { estimate, estimate2 } from '../services/estimator.service';

const builder = new xml.Builder({
  renderOpts: { pretty: false },
});

export default {
  /**
   * @method getEstimate
   * @description get estimated results
   * Route: GET: /on-covid-19
   * @param {Object} request request object
   * @param {Object} response request object
   * @returns {Response} response object
   */

  async getEstimate(request, response) {
    const result = await estimate(request.body);

    return response.status(201).send({
      ...result,
    });
  },

  async getEstimate2(request, response) {
    const result = await estimate2(request.body);
    return response.status(201).send({
      ...result,
    });
  },

  async getEstimateXml(request, response) {
    const result = await estimate2(request.body);
    response.set('Content-Type', 'application/xml');
    return response.status(201).send(builder.buildObject(result));
  },
};
