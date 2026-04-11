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
