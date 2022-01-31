export interface BreadcrumbItem {
	/**
	 * To show in view
	 */
	value: string;
	/**
	 * Routerlink array
	 */
	route: string[];
	/**
	 * Whether add "active" class or not
	 */
	isActive: boolean;
}
