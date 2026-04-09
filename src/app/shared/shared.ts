import { Injectable , signal} from '@angular/core';
import { single } from 'rxjs';
import { QuizResponse, SubmitAnswer, TenantData } from '../models/models';


@Injectable({
  providedIn: 'root',
})
export class Shared {
  isQuizFiltered = signal(false)
  isTimerEnable = signal(false)
   AnswerReponse:any=undefined;
  Category = signal("non")
  Time = signal(0)
  NumberOfQuestion = signal(10);
  NumberOfCurrectQuestion =signal<number>(0)
    answerSeat:SubmitAnswer[] = []
    answerMark:{"qid":number, "option":string , currentQuestion:number}[]=[]
  QuizResponse = signal<QuizResponse|null>({
    data:[],
    statusCode:0,
    message:'intialization'

  })
  TenantData = signal<TenantData|null>({
    categories:[],
    levels:[],
    subjects:[],
    card:[]
  })

  CardData = signal<any>(null)

  isLogin = signal(false)
   QuizFilter(){
         this.isQuizFiltered.set(true)
   }

   enableTimer(){
    this.isTimerEnable.set(true)
   }

  



}
