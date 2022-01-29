import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PaginationComponent } from "./components/pagination/pagination.component";
import { SearchFormComponent } from "./components/search-form/search-form.component";
import { PreventDefaultEventDirective } from "./directives/prevent-default-event/prevent-default-event.directive";

const components: any[] = [PaginationComponent, SearchFormComponent];
const directives: any[] = [PreventDefaultEventDirective];
const pipes: any[] = [];

@NgModule({
	declarations: [...components, ...directives, ...pipes],
	imports: [CommonModule],
	exports: [...components, ...directives, ...pipes],
})
export class SharedModule {}
