import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { SearchFormComponent } from "./search-form.component";

describe("SearchFormComponent", () => {
	let component: SearchFormComponent;
	let fixture: ComponentFixture<SearchFormComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [SearchFormComponent],
			imports: [ReactiveFormsModule],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(SearchFormComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
