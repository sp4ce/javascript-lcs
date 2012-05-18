lcs = window.lcs || {};

lcs.DELETION = lcs.RIGHT = -1;
lcs.INSERTION = lcs.DOWN = 1;
lcs.EQUAL = lcs.DIAGONAL = 0;

/**
 * Compare two strings and return the comparison.
 * @param reference: the refrence string.
 * @param input: the input string.
 */
lcs.compare = function(reference, input) {
  var matrix = []

  // Fill the last line.
  for (var j = reference.length; 0 <= j; j--) {
    matrix[input.length] = matrix[input.length] || [];
    matrix[input.length][j] = { value: reference.length - j, status: lcs.DELETION, direction: lcs.RIGHT };
  }

  // Fill the last column.
  for (var i = input.length; 0 <= i; i--) {
    matrix[i] = matrix[i] || [];
    matrix[i][reference.length] = { value: input.length - i, status: lcs.INSERTION, direction: lcs.DOWN };
  }

  // Fill the last cell.
  matrix[input.length][reference.length] = { value: 0, status: lcs.EQUAL, direction: lcs.DIAGONAL };

  for (var j = reference.length - 1; 0 <= j; j--) {
    for (var i = input.length - 1; 0 <= i; i--) {
      lcs._backtrack(matrix, reference, j, input, i);
    }
  }

  return matrix;
};

/**
 * Run thought the path in the matrix and do the callback for each step.
 * @param matrix that contain the comparison.
 * @param i the start index for the comparison.
 * @param j the start index for the comparison.
 * @param callback to run on each step.
 */
lcs.run = function(matrix, i, j, callback) {
  // Return if we arrive at the end of the input string.
  if (i == matrix.length) {
    return;
  }

  // Do the action
  callback(i, j);

  // Continue to the next step.
  switch(matrix[i][j].direction) {
    case lcs.DIAGONAL: lcs.run(matrix, i + 1, j + 1, callback); break;
    case lcs.RIGHT: lcs.run(matrix, i, j + 1, callback); break;
    case lcs.DOWN: lcs.run(matrix, i + 1, j, callback); break;
  }
};

/**
 * Set the matrix value at the given index by reading values near it.
 * @param matrix to set value.
 * @param reference the reference string input.
 * @param j the index of the reference and the column in the matrix.
 * @param input the string reference input.
 * @param i the index of the input and the line in the matrix.
 */
lcs._backtrack = function(matrix, reference, j, input, i) {
  if (reference[j] == input[i]) {
    matrix[i][j] = { value: matrix[i + 1][j + 1].value, status: lcs.EQUAL, direction: lcs.DIAGONAL };
  } else if (matrix[i][j + 1].value < matrix[i + 1][j].value)
    matrix[i][j] = { value: matrix[i][j + 1].value + 1, status: lcs.DELETION, direction: lcs.RIGHT };
  else {
    matrix[i][j] = { value: matrix[i + 1][j].value + 1, status: lcs.INSERTION, direction: lcs.DOWN };
  }
};
