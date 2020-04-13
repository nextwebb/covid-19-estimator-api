
const covid19ImpactEstimator = (data) => {
    const {
      reportedCases,
      timeToElapse,
      periodType,
      totalHospitalBeds,
      region
    } = data;
    let NormalizeDay;
    let period;
  
    if (periodType === 'days') {
      NormalizeDay = Math.floor(timeToElapse / 3);
      period = timeToElapse;
    } else if (periodType === 'weeks') {
      NormalizeDay = Math.floor((timeToElapse * 7) / 3);
      period = timeToElapse * 7;
    } else {
      NormalizeDay = Math.floor((timeToElapse * 30) / 3);
      period = timeToElapse * 30;
    }
    // impact estimator
    // challenge 1
    const impactCurrentlyInfected = reportedCases * 10;
    const impactInfectionsByRequestedTime = impactCurrentlyInfected * (2 ** NormalizeDay);
    // challenge 2
    const casesByRequestedTime = impactInfectionsByRequestedTime * 0.15;
    let impactHospitalBedsByRequestedTime = (totalHospitalBeds * 0.35) - casesByRequestedTime;
    if (impactHospitalBedsByRequestedTime > 0) {
      impactHospitalBedsByRequestedTime = Math.floor(impactHospitalBedsByRequestedTime);
    } else {
      impactHospitalBedsByRequestedTime = Math.ceil(impactHospitalBedsByRequestedTime);
    }
    // challenge 3
    const impactCasesForICUByRequestedTime = Math.floor(impactInfectionsByRequestedTime * 0.05);
    const impactCasesForVentilatorsByRequestedTime = Math.floor(impactInfectionsByRequestedTime
                                                    * 0.02);
    const impactDollarsInFlight = Math.floor((impactInfectionsByRequestedTime
                                      * region.avgDailyIncomePopulation
                                      * region.avgDailyIncomeInUSD) / period);
    // severe impact estimator
    // challenge 1
    const severeImpactCurrentlyInfected = reportedCases * 50;
    const severeImpactInfectionsByRequestedTime = severeImpactCurrentlyInfected * (2 ** NormalizeDay);
    // challenge 2
    const severeCasesByRequestedTime = severeImpactInfectionsByRequestedTime * 0.15;
    let hospitalBedsByRequestedTime = (totalHospitalBeds * 0.35) - severeCasesByRequestedTime;
    if (hospitalBedsByRequestedTime > 0) {
      hospitalBedsByRequestedTime = Math.floor(hospitalBedsByRequestedTime);
    } else {
      hospitalBedsByRequestedTime = Math.ceil(hospitalBedsByRequestedTime);
    }
    // challenge 3
    const casesForICUByRequestedTime = Math.floor(severeImpactInfectionsByRequestedTime * 0.05);
    const casesForVentilatorsByRequestedTime = Math.floor(severeImpactInfectionsByRequestedTime
                                                * 0.02);
    const dollarsInFlight = Math.floor((severeImpactInfectionsByRequestedTime
                              * region.avgDailyIncomePopulation
                              * region.avgDailyIncomeInUSD) / period);
    // estimation output for impact
    const impact = {
      currentlyInfected: impactCurrentlyInfected,
      infectionsByRequestedTime: impactInfectionsByRequestedTime,
      severeCasesByRequestedTime: casesByRequestedTime,
      hospitalBedsByRequestedTime: impactHospitalBedsByRequestedTime,
      casesForICUByRequestedTime: impactCasesForICUByRequestedTime,
      casesForVentilatorsByRequestedTime: impactCasesForVentilatorsByRequestedTime,
      dollarsInFlight: impactDollarsInFlight
    };
    // extimation output for SevereImpact
    const severeImpact = {
      currentlyInfected: severeImpactCurrentlyInfected,
      infectionsByRequestedTime: severeImpactInfectionsByRequestedTime,
      severeCasesByRequestedTime,
      hospitalBedsByRequestedTime,
      casesForICUByRequestedTime,
      casesForVentilatorsByRequestedTime,
      dollarsInFlight
    };
  
    return {
      data,
      impact,
      severeImpact
    };
  };
  
  module.exports = covid19ImpactEstimator;
  