import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { PaginationComponent } from "./components/pagination/pagination.component";
import { PhotoListComponent } from "./components/photo-list/photo-list.component";
import { SearchFormComponent } from "./components/search-form/search-form.component";
import { PreventDefaultEventDirective } from "./directives/prevent-default-event/prevent-default-event.directive";

const components: any[] = [PaginationComponent, SearchFormComponent, PhotoListComponent];
const directives: any[] = [PreventDefaultEventDirective];
const pipes: any[] = [];

@NgModule({
	declarations: [...components, ...directives, ...pipes],
	imports: [CommonModule, ReactiveFormsModule, RouterModule],
	exports: [...components, ...directives, ...pipes],
})
export class SharedModule {}
