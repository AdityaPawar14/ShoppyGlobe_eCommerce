// Type definitions for the application (using JSDoc)

/**
 * @typedef {Object} Product
 * @property {number} id
 * @property {string} title
 * @property {string} description
 * @property {number} price
 * @property {number} discountPercentage
 * @property {number} rating
 * @property {number} stock
 * @property {string} brand
 * @property {string} category
 * @property {string} thumbnail
 * @property {string[]} images
 */

/**
 * @typedef {Object} CartItem
 * @property {number} id
 * @property {string} title
 * @property {number} price
 * @property {number} quantity
 * @property {string} thumbnail
 * @property {number} stock
 */

/**
 * @typedef {Object} ApiResponse
 * @property {Product[]} products
 * @property {number} total
 * @property {number} skip
 * @property {number} limit
 */
