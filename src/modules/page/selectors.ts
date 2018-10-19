import { createSelector } from 'reselect';

export const getPages = createSelector(
  state => state.pages.items,
  pages => pages
);

export const getPage = (name: string) =>
  createSelector(getPages, pages => pages[name]);

export const getCurrentPage = createSelector(
  getPages,
  state => state.application.currentPageId,
  (pages, currentPageId) => pages[currentPageId] || {}
);

export const getNameOfCurrentPage = createSelector(
  getCurrentPage,
  page => page.name
);

export const hasForm = createSelector(
  getNameOfCurrentPage,
  state => state.form,
  (pageName, forms) => !!forms[pageName]
);

export const isFetching = createSelector(
  state => state.pages.isFetching,
  isFetching => isFetching
);

export const getStaticPage = (state: any, name: string) => state.pages.staticPages[name];
