function gcd(a, b) {
  if (a == 0) {
      return [0, 1, b, [], []];
  }

  // append steps for calculating gcd
  // b = qa + r
  var quotient = Math.floor(b / a);
  var remainder = b % a;

  console.log(`${b} = (${quotient} * ${a}) + ${remainder}`);

  var result = gcd(b % a, a);

  // update results of recursion
  
  var x_org = result[0];
  var y_org = result[1];

  //console.log("x is: " + x_org);
  //console.log("y is: " + y_org);

  var x = y_org - quotient * x_org;
  var y = x_org;

  console.log(`${result[2]} = (${x} * ${a}) + (${y} * ${b})`);

  result[3].push(`${b} = (${quotient} * ${a}) + ${remainder}`);
  result[4].push(`${result[2]} = (${x} * ${a}) + (${y} * ${b})`);

  return [x, y, result[2], result[3], result[4]];
}

function lde(a, b, c) {
  
  // find gcd
  var result = gcd(a, b);
  var gcd_a = result[2];

  // if gcd divides c return object of solutions
  // else return false
  if (c % gcd_a == 0) {
      
      var quotient = (c / gcd_a);
      var xpart = result[0] * quotient;
      var ypart = result[1] * quotient;
      
      // return results
      // the last two elements are the arrays containing the steps to be shown and parsed in string form
      // note: you must traverse through result[3] in reverse
      // first element indicates if a solution exists
      return [true, gcd_a, result[3], xpart, ypart, result[4]];
  }

  return [false, gcd_a, result[3]];
}

module.exports = lde;