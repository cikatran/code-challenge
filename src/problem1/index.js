/**
 * Problem 1: Three ways to sum to n
 * 
 * Each function calculates the sum of integers from 1 to n.
 * For example: sum_to_n(5) === 1 + 2 + 3 + 4 + 5 === 15
 */

/**
 * Implementation A: Mathematical Formula (Gauss's Formula)
 * 
 * Uses the arithmetic series formula: n * (n + 1) / 2
 * This is the most efficient approach with O(1) time complexity.
 * 
 * @param {number} n - any integer
 * @returns {number} - summation from 1 to n
 */
var sum_to_n_a = function (n) {
    // Handle negative numbers by returning 0 (no positive integers to sum)
    if (n <= 0) return 0;
    return (n * (n + 1)) / 2;
};


