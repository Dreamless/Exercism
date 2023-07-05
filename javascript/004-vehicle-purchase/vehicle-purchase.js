// @ts-check
//
// The line above enables type checking for this file. Various IDEs interpret
// the @ts-check directive. It will give you helpful autocompletion when
// implementing this exercise.

/**
 * Determines whether or not you need a licence to operate a certain kind of vehicle.
 *
 * @param {string} kind
 * @returns {boolean} whether a license is required
 */
export function needsLicense(kind) {
  return kind === 'car' || kind === 'truck';
}

/**
 * Helps choosing between two options by recommending the one that
 * comes first in dictionary order.
 *
 * @param {string} option1
 * @param {string} option2
 * @returns {string} a sentence of advice which option to choose
 */
export function chooseVehicle(option1, option2) {
  const restText = ' is clearly the better choice.'
  return option1 < option2 ? (option1 + restText) : (option2 + restText);
}

/**
 * Calculates an estimate for the price of a used vehicle in the dealership
 * based on the original price and the age of the vehicle.
 *
 * @param {number} originalPrice
 * @param {number} age
 * @returns {number} expected resell price in the dealership
 */
export function calculateResellPrice(originalPrice, age) {
  const lowUsedVehicleYear = 3;
  const highUsedVehicleYear = 10;
  const lowUsedVehiclePercent = 80;
  const mediumUsedVehiclePercent = 70;
  const highUsedVehiclePercent = 50;
  const resellPrice = (percent) => ((percent / 100) * originalPrice);

  if (age < lowUsedVehicleYear) {
    return resellPrice(lowUsedVehiclePercent);
  }

  if (age >= lowUsedVehicleYear && age <= highUsedVehicleYear) {
    return resellPrice(mediumUsedVehiclePercent);
  }

  if (age > highUsedVehicleYear) {
    return resellPrice(highUsedVehiclePercent);
  }
}