/**
 * Utility functions, static methods. Not dependent on others.
 */
export class Utils {
	/** Will wait for this amount before taking input again from search field. Is used for minimizing API calls. Use in `debounceTime` operator. */
	static dueTime = 500;

	static isStringMatching(targetStr: string, searchTerm: string) {
		return targetStr.toString().toLowerCase().includes(searchTerm.toLowerCase());
	}
}
