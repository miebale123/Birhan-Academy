/**
 * @typedef {Object} PaymentRequestDto
 * @property {string} cardholderName
 * @property {string} cardNumber
 * @property {string} expiryDate
 * @property {string} cvc
 * @property {string} country
 */

export const PAYMENT_METHODS = Object.freeze({
  CARD: 'card',
})
