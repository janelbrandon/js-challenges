/*
You helped Neo almost get out of the matrix with matrix_addition but
Cypher was one step ahead of you. In order to get past Cypher's trap and
save Neo you need to write a new function.

Write a function similar to the matrix_addition challenge but instead
of addition, write one for multiplication.

Check your solution by running mocha 14_multiply_matrices

Example:
function multiplyMatrices([[1,2,3],[4,5,6]], [[7,8],[9,10],[11,12]])
=> [[58, 64], [139,154]]

Hint:
Try drawing the function out first if the arrays are a little confusing.
*/

// Returns true if the matrix is empty
function isEmpty(matrix) {
	return matrix.length == 0
}
// Returns true if matrix has a single row
function isSingleDim(matrix) {
	return matrix[0][0] == undefined
}
// Returns the number of rows in a matrix
function numRows(matrix) {
	let rows = 0
	// if the matrix length is 0, it is empty
	if (!isEmpty(matrix)) {
		if (isSingleDim(matrix)) {
			//single row
			rows = 1
		} else {
			rows = matrix.length
		}
	}
	return rows
}
// Returns the number of columns in a matrix
function numCols(matrix) {
	let cols = 0
	if (!isEmpty(matrix)) {
		if (isSingleDim(matrix)) {
			cols = matrix.length
		} else {
			// Assumes all rows have same number of columns
			cols = matrix[0].length
		}
	}
	return cols
}

// Returns true if the number of columns in matrix mOne
// is equal to the number of rows in matrix mTwo
function isValidForMultiply(mOne, mTwo) {
	return numCols(mOne) == numRows(mTwo)
}

// Returns the column values of a matrix at the given index
// as an array
function getCol(matrix, index) {
	let col = []
	for (let row of matrix) {
		col.push(row[index])
	}
	return col
}

// Multiplies one row by one column of two matrices
// and returns the single dot product element
function dotProduct(row, col) {
	let dProd = 0
	for (let i = 0; i < row.length; i++) {
		dProd += row[i] * col[i]
	}
	return dProd
}
// Returns result of matrix multiplication, or null
// if the matrices cannot be multiplied
function multiplyMatrices(matrixOne, matrixTwo) {
	if (!isValidForMultiply(matrixOne, matrixTwo)) {
		return null
	}
	let result = []
	for (let rowInd = 0; rowInd < matrixOne.length; rowInd++) {
		let rowResult = []
		for (let colInd = 0; colInd < matrixTwo[0].length; colInd++) {
			rowResult.push(dotProduct(matrixOne[rowInd], getCol(matrixTwo, colInd)))
		}
		result.push(rowResult)
	}
	return result
}

const assert = require("assert")

describe("Matrix multiplication", function() {
	it("Should return the multipilcation of a matrix", function() {
		assert.deepEqual(
			[[58, 64], [139, 154]],
			multiplyMatrices([[1, 2, 3], [4, 5, 6]], [[7, 8], [9, 10], [11, 12]])
		)
	})
	it("Should return null if the matrix cannot be multiplied", function() {
		assert.deepEqual(
			null,
			multiplyMatrices([[8, 12, 5], [40, 21, 8, 17]], [[3, 2, 1, 6], [7, 4, 1, 9]])
		)
		assert.deepEqual(null, multiplyMatrices([[8, 12, 5], [40, 21, 8]], [[3, 2, 1], [7, 4, 1]]))
	})
})
describe("multiplyMatrices with invalid input", function() {
	it("should return null if one is empty", function() {
		let matrix1 = []
		let matrix2 = [1, 2]
		assert.equal(multiplyMatrices(matrix1, matrix2), null)
	})
	it("should return null if dimensions do not match", function() {
		let matrix1 = [1, 2]
		let matrix2 = [1, 2]
		assert.equal(multiplyMatrices(matrix1, matrix2), null)
	})
})

describe("multiplyMatrices with valid input", function() {
	it("should return [[18,5],[26,15]] with inputs [[2,3][4,1]] and [[6,4].[2,-1]]", function() {
		matrix1 = [[2, 3], [4, 1]]
		matrix2 = [[6, 4], [2, -1]]
		expected = [[18, 5], [26, 15]]
		assert.deepEqual(multiplyMatrices(matrix1, matrix2), expected)
	})
	it("should return [[24,28],[1,7]] with inputs [[6,4],[2,-1]], [[2,4],[3,1]]", function() {
		matrix1 = [[6, 4], [2, -1]]
		matrix2 = [[2, 4], [3, 1]]
		expected = [[24, 28], [1, 7]]
		assert.deepEqual(multiplyMatrices(matrix1, matrix2), expected)
	})
	it("should return [[2,13,5],[-7,-8,-4],[16,4,4]] with inputs [[2,1],[-1,-2],[0,4]] and [[-1,6,2],[4,1,1]]", function() {
		matrix1 = [[2, 1], [-1, -2], [0, 4]]
		matrix2 = [[-1, 6, 2], [4, 1, 1]]
		expected = [[2, 13, 5], [-7, -8, -4], [16, 4, 4]]
		assert.deepEqual(multiplyMatrices(matrix1, matrix2), expected)
	})
})
