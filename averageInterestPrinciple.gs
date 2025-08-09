/**
 * Calculates the average interest & principal components of a mortgage payment
 * for each amount owing in a single-column range. Returns an n×2 array:
 *   col 0 -> average principal
 *   col 1 -> average interest
 *
 * @param {number} EMR The effective monthly rate of your mortgage.
 * @param {number} years_of_mortgage The amortization period in years (same for all).
 * @param {number[][]} amount_owings A single-column range of starting balances (n×1).
 * @return {number[][]} An n×2 array: [[principal_1, interest_1], ...]
 * @customfunction
 */
function averageInterestPrincipleBatch(EMR, years_of_mortgage, amount_owings) {
  if (!Array.isArray(amount_owings)) amount_owings = [[amount_owings]];
  if (amount_owings.length === 0) return [];

  var results = [];

  for (var r = 0; r < amount_owings.length; r++) {
    var amt = Number(amount_owings[r][0]);
    var res = _avgForSingle(EMR, years_of_mortgage, amt);
    results.push([res.avgPrincipal, res.avgInterest]);
  }

  return results;
}

// --- helper functions ---
function _avgForSingle(EMR, years, amount_owing) {
  if (years <= 0) return { avgPrincipal: 0, avgInterest: 0 };

  amount_owing = _round2(amount_owing);
  var sumInterest = 0;
  var sumPrincipal = 0;

  var monthly_payment;
  if (EMR === 0) {
    monthly_payment = amount_owing / (years * 12);
  } else {
    var pmt = (EMR * -amount_owing) / (1 - Math.pow(1 + EMR, -(years * 12)));
    monthly_payment = -pmt;
  }

  for (var i = 0; i < 12; i++) {
    var month_interest = _round2(EMR * amount_owing);
    sumInterest += month_interest;

    var month_principal = _round2(monthly_payment - month_interest);
    sumPrincipal += month_principal;

    amount_owing = _round2(amount_owing - month_principal);
  }

  return {
    avgInterest: sumInterest / 12,
    avgPrincipal: sumPrincipal / 12
  };
}

function _round2(x) {
  return Math.round(x * 100) / 100;
}
