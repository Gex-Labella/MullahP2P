/**
 * Checks if a string is a valid Ethereum address
 * @param address The address to validate
 * @returns Boolean indicating if the address is valid
 */
export function isValidEthereumAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

/**
 * Checks if a string is a valid Starknet address
 * @param address The address to validate
 * @returns Boolean indicating if the address is valid
 */
export function isValidStarknetAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{64}$/.test(address);
}

/**
 * Validates an email address format
 * @param email The email to validate
 * @returns Boolean indicating if the email is valid
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates a token amount (positive number with optional decimals)
 * @param amount The amount to validate
 * @param maxDecimals Maximum allowed decimal places
 * @returns Boolean indicating if the amount is valid
 */
export function isValidAmount(amount: string, maxDecimals = 18): boolean {
  if (!amount || parseFloat(amount) <= 0) return false;
  
  const parts = amount.split('.');
  if (parts.length > 2) return false;
  
  if (parts.length === 2 && parts[1].length > maxDecimals) return false;
  
  return true;
}

/**
 * Checks if a password meets security requirements
 * @param password The password to validate
 * @returns Boolean indicating if the password is valid
 */
export function isValidPassword(password: string): boolean {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
}