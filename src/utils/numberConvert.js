var SI_SYMBOL = ["", "k", "M", "G", "T", "P", "E"];

export const convertNumber = (n = 0, precision = 5) => {
  let num;
  if (Math.abs(n) > 1) {
    // what tier? (determines SI symbol)
    var tier = (Math.log10(Math.abs(n)) / 3) | 0;

    // if zero, we don't need a suffix
    if (tier === 0) {
      if (n % 1 === 0) return parseInt(n);
      else return parseFloat(n).toFixed(precision) * 1;
    }

    // get suffix and determine scale
    var suffix = SI_SYMBOL[tier];
    var scale = Math.pow(10, tier * 3);

    // scale the number
    var scaled = n / scale;

    // format number and add suffix
    num = parseFloat(scaled.toFixed(2)) + suffix;
  } else {
    num = n.toLocaleString("en-us", { maximumSignificantDigits: 2 });
  }
  return num;
};
