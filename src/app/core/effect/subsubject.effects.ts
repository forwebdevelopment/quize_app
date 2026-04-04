import { inject, Injectable } from "@angular/core";

import { Actions , ofType ,createEffect } from "@ngrx/effects";
//import { SubSubjectService } from './subsubject.service';
import * as SubSubjectActions from '../action/subsubject.action'
import { mergeMap , map, catchError,withLatestFrom } from "rxjs/operators";
import { of } from "rxjs";
import { Store } from "@ngrx/store";
import { selectCache } from '../selector/subsubject.selectors';
import { Api } from "../api";


@Injectable()

export class SubSubjectEffects{
   private actions$: Actions = inject(Actions)
    private service: Api = inject(Api)
    private store: Store= inject(Store)
  constructor(
    // private actions$: Actions,
    // private service: Api,
    // private store: Store
  ) {}


    loadSubSubjects$ = createEffect(()=>
        this.actions$.pipe(
             ofType(SubSubjectActions.loadSubSubjects),
             withLatestFrom(this.store.select(selectCache)),
             mergeMap(([action , cache])=>{
                   if(cache[action.subjectId]){
                     // Already cached → return success immediately
                     return of(SubSubjectActions.loadSubSubjectsSuccess({
                        subjectId:action.subjectId,
                        subSubjects:cache[action.subjectId]
                     }));
                   }
                   //Not cachec call api
                   return this.service.GetSubSubject(action.subjectId).pipe(
                    map(subSubjects=>SubSubjectActions.loadSubSubjectsSuccess({subjectId:action.subjectId,subSubjects})),
                    catchError(error=>of(SubSubjectActions.loadSubSubjectsFailure({subjectId:action.subjectId,error})))
                   )
             })
        )
    )
}
