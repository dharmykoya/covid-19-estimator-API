const covid19ImpactEstimator = async (data) => {
  const {
    region,
    reportedCases,
    periodType,
    timeToElapse,
    totalHospitalBeds,
  } = data;

  const { avgDailyIncomeInUSD, avgDailyIncomePopulation } = region;

  let result = {};
  const impact = {};
  const severeImpact = {};

  let numberOfDays;

  if (periodType === 'days') {
    numberOfDays = timeToElapse;
  }
  if (periodType === 'weeks') {
    numberOfDays = 7 * timeToElapse;
  }
  if (periodType === 'months') {
    numberOfDays = 30 * timeToElapse;
  }

  const factor = Math.trunc(numberOfDays / 3);
  const daysConversionRatio = Math.trunc(2 ** factor);

  const hospitalBeds = totalHospitalBeds * 0.35;

  /* challenge 1 */

  // impact
  impact.currentlyInfected = reportedCases * 10;
  impact.infectionsByRequestedTime =
    impact.currentlyInfected * daysConversionRatio;

  // severeImpact
  severeImpact.currentlyInfected = reportedCases * 50;
  severeImpact.infectionsByRequestedTime =
    severeImpact.currentlyInfected * daysConversionRatio;

  /* challenge 2 */

  const infected = impact.currentlyInfected * daysConversionRatio;
  const severeInfected = severeImpact.currentlyInfected * daysConversionRatio;

  // impact
  impact.severeCasesByRequestedTime = Math.trunc(0.15 * infected);
  impact.hospitalBedsByRequestedTime = Math.trunc(
    hospitalBeds - 0.15 * infected
  );

  // severeImpact
  severeImpact.severeCasesByRequestedTime = Math.trunc(0.15 * severeInfected);
  severeImpact.hospitalBedsByRequestedTime = Math.trunc(
    hospitalBeds - 0.15 * severeInfected
  );

  /* challenege 3 */
  // impact
  impact.casesForICUByRequestedTime = Math.trunc(
    0.05 * impact.infectionsByRequestedTime
  );
  impact.casesForVentilatorsByRequestedTime = Math.trunc(
    0.02 * impact.infectionsByRequestedTime
  );

  impact.dollarsInFlight = Math.trunc(
    (impact.infectionsByRequestedTime *
      avgDailyIncomeInUSD *
      avgDailyIncomePopulation) /
      numberOfDays
  );

  // severeImpact
  severeImpact.casesForICUByRequestedTime = Math.trunc(
    0.05 * severeImpact.infectionsByRequestedTime
  );
  severeImpact.casesForVentilatorsByRequestedTime = Math.trunc(
    0.02 * severeImpact.infectionsByRequestedTime
  );

  severeImpact.dollarsInFlight = Math.trunc(
    (severeImpact.infectionsByRequestedTime *
      avgDailyIncomeInUSD *
      avgDailyIncomePopulation) /
      numberOfDays
  );

  result = {
    data,
    impact,
    severeImpact,
  };

  return result;
};


const impactCases = (details) => {
  let result = {};

  const {
    daysConversionRatio,
    reportedCases,
    avgDailyIncomeInUSD,
    avgDailyIncomePopulation,
    hospitalBeds,
    numberOfDays,
  } = details;

  // challenge 1
  const currentlyInfected = reportedCases * 10;
  const infectionsByRequestedTime = currentlyInfected * daysConversionRatio;

  const infected = currentlyInfected * daysConversionRatio;

  /* challenge 2 */
  const severeCasesByRequestedTime = 0.15 * infected;
  const hospitalBedsByRequestedTime = hospitalBeds - severeCasesByRequestedTime;

  /* challenege 3 */
  const casesForICUByRequestedTime = 0.05 * infectionsByRequestedTime;
  const casesForVentilatorsByRequestedTime = 0.02 * infectionsByRequestedTime;

  const dollarsInFlight =
    (infectionsByRequestedTime *
      avgDailyIncomeInUSD *
      avgDailyIncomePopulation) /
    numberOfDays;

  result = {
    currentlyInfected: currentlyInfected,
    infectionsByRequestedTime: infectionsByRequestedTime,
    severeCasesByRequestedTime: Math.trunc(severeCasesByRequestedTime),
    hospitalBedsByRequestedTime: Math.trunc(hospitalBedsByRequestedTime),
    casesForICUByRequestedTime: Math.trunc(casesForICUByRequestedTime),
    casesForVentilatorsByRequestedTime: Math.trunc(
      casesForVentilatorsByRequestedTime
    ),
    dollarsInFlight: Math.trunc(dollarsInFlight),
  };
  return result;
};

const severeImpactCases = (details) => {
  let result = {};

  const {
    daysConversionRatio,
    reportedCases,
    avgDailyIncomeInUSD,
    avgDailyIncomePopulation,
    hospitalBeds,
    numberOfDays,
  } = details;

  /* challenge 1 */
  const currentlyInfected = reportedCases * 50;
  const infectionsByRequestedTime = currentlyInfected * daysConversionRatio;

  /* challenge 2 */
  const severeInfected = currentlyInfected * daysConversionRatio;

  const severeCasesByRequestedTime = 0.15 * severeInfected;
  const hospitalBedsByRequestedTime = hospitalBeds - severeCasesByRequestedTime;

  /* challenege 3 */
  const casesForICUByRequestedTime = 0.05 * infectionsByRequestedTime;
  const casesForVentilatorsByRequestedTime = 0.02 * infectionsByRequestedTime;

  const dollarsInFlight = Math.trunc(
    (infectionsByRequestedTime *
      avgDailyIncomeInUSD *
      avgDailyIncomePopulation) /
      numberOfDays
  );

  result = {
    currentlyInfected: currentlyInfected,
    infectionsByRequestedTime: infectionsByRequestedTime,
    severeCasesByRequestedTime: Math.trunc(severeCasesByRequestedTime),
    hospitalBedsByRequestedTime: Math.trunc(hospitalBedsByRequestedTime),
    casesForICUByRequestedTime: Math.trunc(casesForICUByRequestedTime),
    casesForVentilatorsByRequestedTime: Math.trunc(
      casesForVentilatorsByRequestedTime
    ),
    dollarsInFlight: Math.trunc(dollarsInFlight),
  };
  return result;
};

/**
 * @method getEstimate
 * @description get estimated results
 * Route: GET: /on-covid-19
 * @param {Object} request request object
 * @param {Object} response request object
 * @returns {Response} response object
 */

export const estimate = async (data) => {
  //   const result = await covid19ImpactEstimator(data);
  const {
    region,
    reportedCases,
    periodType,
    timeToElapse,
    totalHospitalBeds,
  } = data;

  const { avgDailyIncomeInUSD, avgDailyIncomePopulation } = region;

  let result = {};

  let numberOfDays;

  if (periodType === 'days') {
    numberOfDays = timeToElapse;
  }
  if (periodType === 'weeks') {
    numberOfDays = 7 * timeToElapse;
  }
  if (periodType === 'months') {
    numberOfDays = 30 * timeToElapse;
  }

  const factor = Math.trunc(numberOfDays / 3);
  const daysConversionRatio = Math.trunc(2 ** factor);

  const hospitalBeds = totalHospitalBeds * 0.35;

  const details = {
    reportedCases,
    avgDailyIncomeInUSD,
    avgDailyIncomePopulation,
    hospitalBeds,
    daysConversionRatio,
    numberOfDays,
  };

  const impact = await impactCases(details);
  const severeImpact = await severeImpactCases(details);

  return {
    data,
    impact,
    severeImpact,
  };
};

export const estimate2 = async (data) => {
  const result = await covid19ImpactEstimator(data);
  return result;
};
