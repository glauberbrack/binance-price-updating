/**
 * @description: Formats a string representing a number to a fixed number of decimal places.
 *
 * @param {string} value - The value to be formatted.
 * @param {number} [decimalPlaces=4] - The number of decimal places to format to. Default is 4.
 * @returns {string} - The formatted number as a string.
 */
export const formatDecimalNumber = (
  value: string,
  decimalPlaces: number = 4
): string => {
  if (!value) return "";

  const parsedValue = parseFloat(value);

  if (isNaN(parsedValue)) {
    if (!value) return "";
  }

  return parsedValue.toFixed(decimalPlaces);
};

/**
 * @description: Formats a string representing a percentage value.
 *
 * @param {string} value - The value to be formatted.
 * @returns {string} - The formatted percentage as a string.
 * @throws {Error} - Throws an error if the value is not a valid number.
 */
export const formatPercentage = (value: string): string => {
  if (!value) return "0.00%";

  const parsedValue = parseFloat(value);

  if (isNaN(parsedValue)) {
    if (!value) return "0.00%";
  }

  return `${(parsedValue * 100).toFixed(2)}%`;
};
