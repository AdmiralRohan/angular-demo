# Angular Demo

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.0.

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `npm run build-server1` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `npm run test-all` to execute all unit tests.

Run `npm test <file_path>` to execute unit tests in particular file. eg. `npm test src/app/photos/services/photos-facade.service.spec.ts`

To make coverage report: `npm run coverage`

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Linting

To run eslint (without autofix): `npm run lint`

To run eslint and autofix issues: `npm run lint-fix`

This project has git hooks installed, so if you commit it will lint staged files. And prevent you without fixing linting issues.

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

## Testing

Will use `mock.ts` for mocking purposes. I listed some mock state there, will use them in case of read only tests eg. `getPostById()` (there is nothing to write in store).

In case we need to update store and check, we need to spy the store and use a temp obj as store. eg. `fetchAndSavePostData()`

## Some thoughts

- Dashboard is loaded first, so not keeping this as lazy module.
- layout.component holds layout of whole app, and also manages cached data.
- Functions/classes marked with @deprecated tag are not currently used by anyone, and may be cleaned up in future.
- Core module holds singleton services, whereas shared module holds dependency-free components, directives, pipes.
- We mainained smart-dumb component pattern.
- No component can directly access store or http layer. They need to access outside world via their respective facade service.
