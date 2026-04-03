// subsubject.selectors.ts
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { SubSubjectState } from '../reducer/subsubject.reducer';

export const selectSubSubjectState = createFeatureSelector<SubSubjectState>('subsubjects');

export const selectCache = createSelector(
  selectSubSubjectState,
  (state) => state.cache
);

export const selectSubSubjectsBySubjectId = (subjectId: number) =>
  createSelector(selectCache, (cache) => cache[subjectId] || []);