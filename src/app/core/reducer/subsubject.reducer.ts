import { createReducer , on } from "@ngrx/store";
import * as SubSubjectActions from '../action/subsubject.action';
import { SubSubject } from "../../models/models";
export interface SubSubjectState{
    cache:{[subjectId:number]:SubSubject[]};
    loading:boolean;
    error:any
}
export const initialState:SubSubjectState={
    cache:{},
    loading:false,
    error:null
}
export const subsubjectReducer = createReducer(
initialState,
on(SubSubjectActions.loadSubSubjects,(state)=>({
    ...state,
    loading:true,
    error:null
})),
on(SubSubjectActions.loadSubSubjectsSuccess , (state , {subjectId , subSubjects})=>({
    ...state,
    loading:true,
   cache:{...state.cache, [subjectId]:subSubjects}
})),
on(SubSubjectActions.loadSubSubjectsFailure, (state , {error})=>({
    ...state,
    loading:false,
    error
}))
)