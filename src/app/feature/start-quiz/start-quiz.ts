import { Component, inject , ChangeDetectorRef ,AfterViewInit  } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Shared } from '../../shared/shared';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { Api } from '../../core/api';
import { ResponseAnswer, SubmitAnswer } from '../../models/models';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-start-quiz',
  imports: [CommonModule],
  templateUrl: './start-quiz.html',
  styleUrl: './start-quiz.css',
})
export class StartQuiz {

  sharedService:Shared = inject(Shared)
  constructor(private cd:ChangeDetectorRef , private routs:Router , private activeRoute:ActivatedRoute,  private api:Api , private sanitizer: DomSanitizer){

  }
 currentQuestion = 1;
  totalQuestions = 4;
  totalTime = 0; // in minutes
   second:number = 0;
   minut:number = 0;
   hour:number = 0;
  timer = '00:00:00';
  questions:any[] = []
  question:any
  isOpen:boolean = false
  selectedOption: string | null = null;
  AtteptQuestion:number = 0
  totalMinut=0
  isReview:boolean = false;
  currentQueId:number=0;
  url:string = "https://anotepad.com/note/read/ipwpq3xd"
  safeUrl!: SafeResourceUrl;
  isTimerEnable:boolean = this.sharedService.isTimerEnable()
   


  ngOnInit(){
debugger
 this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);


if(this.sharedService.answerMark.length>0){
  this.selectedOption=this.sharedService.answerMark[0].option
}
console.log(this.sharedService.answerMark)

this.activeRoute.fragment.subscribe(fragment => {
   this.isReview = fragment === 'review';
});

this.questions=[]
    this.sharedService.QuizResponse()?.data.forEach((element:any) => {
     
      this.questions.push({
        text: element.question,
        queNo: element.quizeid,
        options: [element.option1 , element.option2 , element.option3 , element.option4]
      })
    }
    );
    this.totalQuestions = this.questions.length

    this.question=this.questions[0]
    if(this.isTimerEnable){
      this.totalTime = this.sharedService.Time();
      this.startTime()
    }

  }



  ngAfterViewInit(){
 if(this.sharedService.AnswerReponse){
  this.currentQueId=this.sharedService.answerMark[0].qid
  this.HighLightAnswer()
 }
  }

  startTime(){

   var intervalID = setTimeout(() => {
    
      this.second =this.second+1
      if(this.second==60){
        this.second = 0
        this.minut++
        this.totalMinut++;

        if(this.minut==60){
          this.minut = 0;
          this.hour++
        }
      }


    let second
    let minut
    let hour
       second =  this.second<10?`0${this.second}`:this.second
       minut = this.minut<10?`0${this.minut}`:this.minut
       hour = this.hour<10?`0${this.hour}`:this.hour
     

      this.timer = `${hour}: ${minut}: ${second}`
      this.cd.detectChanges()
      console.log(this.timer)
          if(Number(this.totalTime) ==this.totalMinut){
            clearTimeout(intervalID)   
             this.routs.navigate(['result'])
          }else{
             this.startTime()
          }
   
    }, 1000);
  }

  selectOption(option: string , quesNo:number , currentQue:any) {

     var index = this.sharedService.answerSeat.findIndex(x=>x.qid==quesNo)
     if(index>-1){
          this.sharedService.answerSeat[index].option=option
           this.sharedService.answerMark[index].option=option
     }else{

    this.sharedService.answerSeat.push({
      qid:quesNo,
      option:option
    })
    this.sharedService.answerMark.push({
       qid:quesNo,
       option:option,
       currentQuestion:currentQue
    })
  }
  this.AtteptQuestion = this.sharedService.answerSeat.length
    console.log(this.sharedService.answerSeat)
    this.selectedOption = option;
  }

  nextQuestion() {

    

    if (this.currentQuestion < this.totalQuestions) {
      this.currentQuestion++;
      this.question = this.questions[this.currentQuestion-1]
         
     var index = this.sharedService.answerMark.findIndex(x=>x.currentQuestion == this.currentQuestion)
     if(index>-1){
          var currentQue:any = this.sharedService.answerMark[index];
          this.selectedOption=currentQue.option
          this.currentQueId = currentQue.qid;
     }
    }
    if(this.sharedService.AnswerReponse && this.sharedService.AnswerReponse.length>0){
      setTimeout(() => {
        this.HighLightAnswer()
      }, 25);
      
    }
  }

  previousQuestion() {
    
    if (this.currentQuestion > 1) {
      this.currentQuestion--;
        this.question = this.questions[this.currentQuestion-1]
        
     var index = this.sharedService.answerMark.findIndex(x=>x.currentQuestion == this.currentQuestion)
     if(index>-1){
          // this.selectedOption=this.sharedService.answerMark[index].option
          var currentQue:any = this.sharedService.answerMark[index];
          this.selectedOption=currentQue.option
          this.currentQueId = currentQue.qid;
     }
    }
    if(this.sharedService.AnswerReponse && this.sharedService.AnswerReponse.length>0){
      setTimeout(() => {
         this.HighLightAnswer()
      }, 25);
     
    }
  }


  submitQuiz(){

    this.api.CheckAnswer(this.sharedService.answerSeat).subscribe((data:any)=>{
      this.sharedService.AnswerReponse = data.data;
           let  numbercurrectAns = data.data.filter((a:any)=>a.ans).length
           this.sharedService.NumberOfCurrectQuestion.set(numbercurrectAns)
           console.log(this.sharedService.NumberOfCurrectQuestion())
           this.routs.navigate(['result'])
    })
    

  }


  exitReview(){
    this.routs.navigate(['/quizcard'])
  }
  openPopup(isOpenP:boolean){
      this.isOpen = isOpenP
  }

  HighLightAnswer(){
    this.sharedService.AnswerReponse.forEach((element:any) => {

      var d =   document.getElementById(element.correctAns) as HTMLUListElement;
      if(d!=null && this.currentQueId==element.qid){
        d.style.backgroundColor ='#b4ffb4'
        d.style.borderColor='green'
      }else if(d!=null){
           d.style.backgroundColor =''
        d.style.borderColor=''
      }
         
    });
   
  }
}
