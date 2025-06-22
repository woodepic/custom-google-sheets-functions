/**
 * Calculates the average interest & principle components of a mortgage payment throughout a year.
 *
 * @param {number} EMR The effective monthly rate of your mortgage.
 * @param {number} years_of_mortgage The total number years of your mortgage (amortization period)
 * @param {number} amount_owing The amount owing on the mortgage at the beginning of the year
 * @param {string} mode The mode of this function, i.e. which return value you want. Can be interest, principle, or payment
 * @return {number} The average interest payment, average principle payment, or the payment of your mortgage.
 * @customfunction
 */

function averageInterestPrinciple(EMR, years_of_mortgage, amount_owing, mode) {

  if (years_of_mortgage <= 0){return 0;} //case for when this function is called but the mortgage is already paid off

  amount_owing = Math.round(amount_owing * 100) / 100; //round to nearest cent
  sum_of_months_interest = 0;
  sum_of_months_principle = 0;

  //Calculate total montly payment
  if (EMR === 0) {
    monthly_payment = (amount_owing / (years_of_mortgage * 12));
  } else {
    var pmt = (EMR * -amount_owing) / (1 - Math.pow(1 + EMR, -(years_of_mortgage * 12)));
    monthly_payment = -pmt;
  }

  //Populate arrays with monthly interest & principle payment components
  for (var i = 0; i < 12; i++) {
    month_interest = EMR * amount_owing;
    month_interest = Math.round(month_interest * 100) / 100; //round to nearest cent
    sum_of_months_interest = sum_of_months_interest + (month_interest);

    month_principle = monthly_payment - month_interest;
    month_principle = Math.round(month_principle * 100) / 100; //round to nearest cent
    sum_of_months_principle = sum_of_months_principle + month_principle;

    amount_owing = amount_owing - month_principle;
    amount_owing = Math.round(amount_owing * 100) / 100; //round to nearest cent
  }

  average_interest = sum_of_months_interest / 12;
  average_principle = sum_of_months_principle / 12;

  switch (mode) {
    case "interest":
      return average_interest
    case "principle":
      return average_principle
    case "payment":
      return monthly_payment
    default:
      throw new Error("#REF! Choose either 'interest' or 'principle'.");
  }
}
