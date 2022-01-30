import { Directive, HostListener } from "@angular/core";

/**
 * Mainly used where we have anchor tags in template and don't want it to be clickable.
 */
@Directive({
	selector: "[appPreventDefaultEvent]",
})
export class PreventDefaultEventDirective {
	@HostListener("click", ["$event"])
	@HostListener("keydown.enter", ["$event"])
	public onClick(event: MouseEvent): void {
		event.preventDefault();
	}
}
