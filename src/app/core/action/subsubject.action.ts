import {createAction , props} from '@ngrx/store'
import { SubSubject } from '../../models/models';

export const loadSubSubjects = createAction(
    '[SubSubject] Load',
    props<{subjectId:number}>()
);

export const loadSubSubjectsSuccess = createAction(
      '[SubSubject] Load Success',
      props<{subjectId:number; subSubjects:SubSubject[]}>()
);


export const loadSubSubjectsFailure = createAction(
      '[SubSubject] Load Failure',
       props<{subjectId:number;error:any}>()
)