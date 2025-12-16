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

/**
 * Implementation B: Iterative Loop
 * 
 * Uses a simple for loop to accumulate the sum.
 * Time complexity: O(n)
 * 
 * @param {number} n - any integer
 * @returns {number} - summation from 1 to n
 */
var sum_to_n_b = function (n) {
    // Handle negative numbers by returning 0 (no positive integers to sum)
    if (n <= 0) return 0;

    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
};

/**
 * Implementation C: Recursive Approach
 * 
 * Uses recursion to calculate the sum.
 * Time complexity: O(n)
 * Space complexity: O(n) due to call stack
 * 
 * @param {number} n - any integer
 * @returns {number} - summation from 1 to n
 */
var sum_to_n_c = function (n) {
    // Base case: if n <= 0, return 0
    if (n <= 0) return 0;
    // Recursive case: n + sum of (n-1)
    return n + sum_to_n_c(n - 1);
};

// Export functions for testing
module.exports = { sum_to_n_a, sum_to_n_b, sum_to_n_c };
