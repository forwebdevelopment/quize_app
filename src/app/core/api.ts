import { inject, Injectable } from "@angular/core";
import {enviroment} from '../../envinroments/environment'
import { HttpClient , HttpHeaders } from "@angular/common/http";
import { ResponseAnswer, SubmitAnswer, SubSubject, TenantDataResponse } from "../models/models";
import { Observable } from "rxjs";
@Injectable(
    {
        providedIn:'root'
    }
)

export class Api{

     private apiUrl = enviroment.api;
     private http = inject(HttpClient)
    loginApi(email:string , password:string){
        const url = `${this.apiUrl}Auth/login`
         const cred = 
            {
             email: email,
             password: password
         }


      return this.http.post(url , cred)
         
    }


    TenantApi(){
        const url  =`${this.apiUrl}Tenant`

        return this.http.get<TenantDataResponse>(url)
    }

    AddQuiz(data:any){
        const url = `${this.apiUrl}Quiz`
        return this.http.post(url,data)
    }



    GetQuizByFilter(levelID:number , subjectId:number , numberofquiz:number){
        const url = `${this.apiUrl}QuizUser/getquiz/?levelId=${levelID}&subjectId=${subjectId}&NumberQuize=${numberofquiz}`
        return this.http.get(url)
    }


    CheckAnswer(list: SubmitAnswer[]){
      const url = `${this.apiUrl}QuizUser/checkanswer`
      return this.http.post<ResponseAnswer[]>(url ,list )
    }


      GetSubSubject(subjectId : number):Observable<SubSubject[]>{
        const url = `${this.apiUrl}Tenant/subsubject?SubjectId=${subjectId}`
        return this.http.get<SubSubject[]>(url)
      }

}