/**
 * Calculates the specified quartile of the given data range, according to STAT 235 Policy.
 * SOURCE OF FORMULA: https://articles.outlier.org/what-is-the-interquartile-range
 * Note: Tested to be correct for STAT 235 for even count datasets. Untested for uneven count.
 *
 * @param {Array} dataRange - The range of data values for which to calculate the quartile.
 * @param {number} quartileNumber - The quartile to calculate (1 for Q1, 2 for Q2, 3 for Q3).
 * @return The calculated quartile value.
 * @customfunction
 */
function QUARTILE_235(dataRange, quartileNumber) {
  // Check if quartileNumber is valid (1, 2, or 3)
  if (![1, 2, 3].includes(quartileNumber)) {
    return "Invalid quartile number. Use 1, 2, or 3.";
  }

  // Flatten the 2D array to a 1D array
  const dataArray = dataRange.flat();

  // Sort the data array in ascending order
  const sortedData = dataArray.sort((a, b) => a - b);

  // Calculate the index for the specified quartile
  var L = (quartileNumber) * 0.25 * dataArray.length;

  if (L % 1 ===0) {
    //Whole number
    return (sortedData[L-1] + sortedData[L]) / 2
  }
  else {
    //not whole number
    L = Math.ceil(L);
    return sortedData[L-1]

  }
}
