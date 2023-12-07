/**
 * Note: These functions are not rigorously tested, so use at your own risk
 * Note: These functions were made using light assistance of chatGPT
 */



/**
 * Returns the future value of an investment using compound interest and regular additions.
 *
 * @param {number} initialAmount - The initial amount of the investment.
 * @param {number} regularAddition - The amount added regularly to the investment.
 * @param {number} additionsPerYear - The number of times the regular addition is made per year.
 * @param {number} compoundsPerYear - The number of times interest is compounded per year.
 * @param {number} numAdditions - The total number of regular additions over the investment period.
 * @param {number} interestRate - The annual interest rate (as a decimal).
 * @param {number} additionPeriodsSittingWithNoAdditions - How long you let the investment sit and grow after you stop contributing. (In the unit of addition periods)
 * @return {number} The future value of the investment.
 * @customfunction
 */ 
function compoundInterest(initialAmount, regularAddition, additionsPerYear, compoundsPerYear, numAdditions, interestRate, additionPeriodsSittingWithNoAdditions) {
  let totalValue = initialAmount;

  for (let i = 0; i < numAdditions; i++) {
    // Calculate compound interest on the existing total value
    totalValue = totalValue * Math.pow(1 + interestRate / compoundsPerYear, compoundsPerYear / additionsPerYear);

    // Add the regular addition to the total value
    totalValue += regularAddition;
  }

  // Sitting with no contribution
  if (additionPeriodsSittingWithNoAdditions > 0) {
    for (let i = 0; i < additionPeriodsSittingWithNoAdditions; i++) {
      // Calculate compound interest on the existing total value
      totalValue = totalValue * Math.pow(1 + interestRate / compoundsPerYear, compoundsPerYear / additionsPerYear);
    }
  }

  return totalValue;
}


/**
 * Returns the regular addition required to reach a specified future value with compound interest.
 *
 * @param {number} initialAmount - The initial amount of the investment.
 * @param {number} futureValue - The desired future value of the investment.
 * @param {number} additionsPerYear - The number of times the regular addition is made per year.
 * @param {number} compoundsPerYear - The number of times interest is compounded per year.
 * @param {number} numAdditions - The total number of regular additions over the investment period.
 * @param {number} interestRate - The annual interest rate (as a decimal).
 * @return {number} The required regular addition.
 * @param {number} additionPeriodsSittingWithNoAdditions - How long you let the investment sit and grow after you stop contributing. (In the unit of addition periods)
 * @customfunction
 */
function requiredRegularAddition(initialAmount, futureValue, additionsPerYear, compoundsPerYear, numAdditions, interestRate, additionPeriodsSittingWithNoAdditions) {

  let regularAddition = 0;
  do{
    regularAddition = regularAddition + 0.01;
    tempFutureValue = compoundInterest(initialAmount, regularAddition, additionsPerYear, compoundsPerYear, numAdditions, interestRate)
    tempFutureValue = compoundInterest(tempFutureValue, 0, additionsPerYear, compoundsPerYear, additionPeriodsSittingWithNoAdditions, interestRate)
  } while (tempFutureValue <= futureValue);

  return regularAddition;
}





