/**
 * Sets the header cell name by capitalizing the first letter of the input
 * string and adding a space after it to place the remainig characters.
 *
 * @example
 * Input: firstName - Output: First Name
 * Input: lastName - Outut: Last Name
 */
export const setHeaderCellName = (str: string): string =>
  (str.charAt(0).toUpperCase() + str.slice(1)).replace(/([A-Z])/g, ' $1');
