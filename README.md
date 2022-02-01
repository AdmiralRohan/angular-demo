# AngularDemo

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Search, Sort, Pagination flow

I'm using post list for this example.

Post has 3 lists in our store:

- posts: main list fetched from API
- fetchedPosts: main list filtered by search term and sorted list
- paginatedPosts: final list, which is displayed at the page

All these actions are triggered through query params. We update query params through `searchTermChanged()`, `sortList()`, `addPageToQueryParam()` (current page change through pagination) methods of posts.component.

Now we are subscribing to queryParams change event in `listenToQueryParamsChange()` in posts-facade. That will call `_filterList()` in facade itself. (1)

First it will fetch master post list (`posts`) and filter it with search term, then applies if sorting is applicable. Hence `filteredList` is formed here. (2)

`paginationRange` can change if:

- user changes page via pagination option
- user types something else on search box, and it changes `filteredList`

No matter what, we will just update the queryParams (source of truth), currentPage will be inputtted into pagination component, then new `paginationRange` will be calculated and propagated above (checked in `ngOnChanges()`).

Sorting starts from clicking on the icon in list header. It reverses the sort direction and emits event. That will add the sorting status in queryParams. That will filter the list as described above in point 1 and 2.
