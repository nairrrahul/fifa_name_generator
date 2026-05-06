/**
 * Generate a random name based on nationality and optional second nationality
 * @param nationality - Country name (full name or 3-letter code) for primary nationality
 * @param secNat - Optional second nationality for mixed heritage names
 * @returns A generated name in "FirstName LastName" format
 */
export function generateName(nationality: string, secNat?: string): string;

/**
 * Generate multiple names from a list of nationalities
 * @param nationalities - Array of nationalities (strings or [primary, secondary] tuples)
 * @returns Array of generated names
 */
export function generateNamesFromList(nationalities: (string | [string, string])[]): string[];

/**
 * Generate a random name as an object with separate first and last names
 * @param nationality - Country name (full name or 3-letter code) for primary nationality
 * @param secNat - Optional second nationality for mixed heritage names
 * @returns An object with firstName and lastName properties
 */
export function generateNameSplit(nationality: string, secNat?: string): { firstName: string; lastName: string };

/**
 * Generate multiple names as objects from a list of nationalities
 * @param nationalities - Array of nationalities (strings or [primary, secondary] tuples)
 * @returns Array of name objects with firstName and lastName properties
 */
export function generateSplitNamesFromList(nationalities: (string | [string, string])[]): { firstName: string; lastName: string }[];
