/**
 * Calculates after-tax income based on given tax brackets and pre-tax earnings.
 * Unspecified optional parameters will assume 2024 Alberta tax code.
 * This is mostly working in it's current state. Slightly off.
 * @customfunction
 * 
 * @param {number} employmentIncome - The pre-tax employment income.
 * @param {Array} provBrackets - (Optional) 2D array outlining the provincal tax brackets.
 * @param {number} provBpa - (Optional) The provincial (fixed) basic personal amount.
 * @param {Array} fedBrackets - (Optional) 2D array outlining the federal tax brackets.
 * @param {number} fedMinBpa - (Optional) The federal minimum basic personal amount.
 * @param {number} fedAddBpa - (Optional) The federal maximum additional basic personal amount.
 * @param {number} fedAddBpaThresh - (Optional) The threshold for which federal basic personal amount additions are lowered.
 * @param {number} fedAddBpaRed - (Optional) The % rate at which federal basic personal amount additions are reduced for every dollar above the threshold.
 * @return {number} - After-tax income.
 */
function afterTax(employmentIncome, provBrackets, provBpa, fedBrackets, fedMinBpa, fedAddBpa, fedAddBpaThresh, fedAddBpaRed) {
  tax = 0;

  //first calculate prov. tax:
  netIncome = employmentIncome - provBpa;
  if (netIncome < 0) {netIncome = 0}

  //Iterate through provincial brackets
  lowerThresh = 0;
  for (var i = 0; i < provBrackets.length; i++) {
    if (provBrackets[i][0] != 'beyond'){
      upperThresh = provBrackets[i][0];
      rate = provBrackets[i][1];

      if (netIncome > lowerThresh) {
        amtOver = netIncome - lowerThresh;
        maxAmtOver = upperThresh - lowerThresh;
        amtToTax = Math.min(amtOver, maxAmtOver)

        console.log('DEBUG: Income: '+String(employmentIncome)+' netIncome: '+String(netIncome) + ' lowerThresh: '+String(lowerThresh)+' upperThresh: '+String(upperThresh)+' rate: '+String(rate)+' amtOver: '+String(amtOver)+' maxAmtOver: '+String(maxAmtOver)+' amtToTax: '+String(amtToTax)+' taxAddition: '+String(amtToTax * rate));
        
        tax += amtToTax * rate;
      }
      lowerThresh = upperThresh;
    }
    else {
      rate = provBrackets[i][1];

      if (netIncome > lowerThresh) {
        amtOver = netIncome - lowerThresh;
        tax += amtOver * rate;
      }
    }
  }

  //next calculate fed. tax:
  netIncome = employmentIncome - fedMinBpa - fedAddBpa;
  if (netIncome < 0) {netIncome = 0}

  //Iterate through provincial brackets
  lowerThresh = 0;
  for (var i = 0; i < fedBrackets.length; i++) {
    if (fedBrackets[i][0] != 'beyond'){
      upperThresh = fedBrackets[i][0];
      rate = fedBrackets[i][1];

      if (netIncome > lowerThresh) {
        amtOver = netIncome - lowerThresh;
        maxAmtOver = upperThresh - lowerThresh;
        amtToTax = Math.min(amtOver, maxAmtOver)

        console.log('DEBUG: Income: '+String(employmentIncome)+' netIncome: '+String(netIncome) + ' lowerThresh: '+String(lowerThresh)+' upperThresh: '+String(upperThresh)+' rate: '+String(rate)+' amtOver: '+String(amtOver)+' maxAmtOver: '+String(maxAmtOver)+' amtToTax: '+String(amtToTax)+' taxAddition: '+String(amtToTax * rate));
        
        tax += amtToTax * rate;
      }
      lowerThresh = upperThresh;
    }
    else {
      rate = fedBrackets[i][1];

      if (netIncome > lowerThresh) {
        amtOver = netIncome - lowerThresh;
        tax += amtOver * rate;
      }
    }
  }


  //Finally Calculate CPP / EI contributions
  if (netIncome < 67379.60) {
    tax += netIncome * 0.0706
  }
  else{
    tax += 4757
  }

  // return employmentIncome - tax;
  return employmentIncome - tax;

}
