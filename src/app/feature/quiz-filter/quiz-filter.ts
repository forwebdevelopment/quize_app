import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ɵEmptyOutletComponent, RouterLink, Router } from "@angular/router";
import { Shared } from '../../shared/shared';
import { Level, Subject, SubSubject } from '../../models/models';
import { Api } from '../../core/api';
import { LoaderService } from '../../core/loader';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { loadSubSubjects } from '../../core/action/subsubject.action';
import { selectSubSubjectsBySubjectId } from '../../core/selector/subsubject.selectors';

@Component({
  selector: 'app-quiz-filter',
  imports: [FormsModule,
    CommonModule],
  templateUrl: './quiz-filter.html',
  styleUrl: './quiz-filter.css',
})
export class QuizFilter {
   sharedService = inject(Shared)
   time:number=0
   isTech:boolean = false
   syllabus: Subject[]=[]
   level:Level[]=[]
  numberOfQuestions:number = 10
    subSubjects$!: Observable<SubSubject[]>;

 filters = {
    category: 'Tech',
    level: 'Select Level',
    syllabus: 'Select Syllabus',
    useTimer: false,
    timePerQuestion: '',
  
  };

 

  constructor(private cd:ChangeDetectorRef , private routs:Router , private api:Api , private loaderService: LoaderService ,private store: Store) {

  }
  ngOnInit(){

     this.sharedService.QuizFilter()
     this.filters.category = this.sharedService.Category()
     this.onChangeCateory()
  }





  quizzes = [
    {
      title: 'Java Basics',
      level: 'Beginner',
      questions: 10,
      timer: 10
    },
     {
      title: 'c# Basics',
      level: 'Beginner',
      questions: 10,
      timer: 10
    },
     {
      title: 'Angualr Basics',
      level: 'Beginner',
      questions: 10,
      timer: 10
    },
     {
      title: 'Angualr Basics',
      level: 'Beginner',
      questions: 10,
      timer: 10
    },
     {
      title: 'Angualr Basics',
      level: 'Beginner',
      questions: 10,
      timer: 10
    },
     {
      title: 'Angualr Basics',
      level: 'Beginner',
      questions: 10,
      timer: 10
    },
     {
      title: 'Angualr Basics',
      level: 'Beginner',
      questions: 10,
      timer: 10
    },
     {
      title: 'Angualr Basics',
      level: 'Beginner',
      questions: 10,
      timer: 10
    },
     {
      title: 'Angualr Basics',
      level: 'Beginner',
      questions: 10,
      timer: 10
    }
  ];



  onChangeCateory(){
    if(this.filters.category!='Select Category'){
      this.sharedService.Category.set(this.filters.category)
    }

    this.filters.level = 'Select Level'
    this.filters.syllabus = 'Select Syllabus'
    var tenantdata:any= this.sharedService.TenantData();
    tenantdata.card= this.sharedService.CardData()
    this.sharedService.TenantData.set(tenantdata)
    
     if(this.filters.category!='non'){

     tenantdata.card =    this.sharedService.TenantData()?.card.filter(c=>c.catName==this.sharedService.Category())
     this.sharedService.TenantData.set(tenantdata) 

         this.isTech = this.filters.category=="Tech"?true:false
         this.cd.detectChanges()
      }else{
         var tenantdata:any= this.sharedService.TenantData();
     tenantdata.card =    this.sharedService.TenantData()?.card.filter(c=>c.catName!=this.sharedService.Category())
     this.sharedService.TenantData.set(tenantdata) 
        this.isTech = this.sharedService.Category()=="Tech"
         this.cd.detectChanges()
      }
  }

  enableTimer(){
    this.sharedService.enableTimer();

  }
enterTime(){
  debugger
  this.filters.timePerQuestion = this.time.toString()
  this.sharedService.Time.set(this.time)
}


  onChangeLevel(){
    if(this.filters.category!='Select Level'){
     // this.sharedService.Category.set(this.filters.category)
    }
    var tenantdata:any= this.sharedService.TenantData();
    tenantdata.card= this.sharedService.CardData()
     this.sharedService.TenantData.set(tenantdata)
     tenantdata.card =    this.sharedService.TenantData()?.card.filter(c=>c.levelName==this.filters.level && (c.subject.toLocaleLowerCase()==this.filters.syllabus.toLocaleLowerCase() || this.filters.syllabus=='Select Syllabus'))  
     this.sharedService.TenantData.set(tenantdata) 
   
  }




  onChangeSyllabus(){

    debugger
     var tenantdata:any= this.sharedService.TenantData();
     tenantdata.card= this.sharedService.CardData()
     this.sharedService.TenantData.set(tenantdata)
     debugger
     tenantdata.card =    this.sharedService.TenantData()?.card.filter(c=>c.subject.toLocaleLowerCase()==this.filters.syllabus.toLocaleLowerCase()&&
      (c.levelName.toLocaleLowerCase()==this.filters.level.toLocaleLowerCase() || this.filters.level=='Select Category' || this.filters.category=='Non Tech'))
     this.sharedService.TenantData.set(tenantdata) 

  }

isSubQuiz:boolean = false;

  getSubQuizCard(val:boolean){
     const subjectId = 120; // Example
    this.store.dispatch(loadSubSubjects({ subjectId }));
    this.subSubjects$ = this.store.select(selectSubSubjectsBySubjectId(subjectId));
this.subSubjects$.subscribe(data => {
      console.log('Response from store:', data);
    });

 this.isSubQuiz = val


  }

  getQuiz(data:any){


    debugger
    this.loaderService.show();
     let levelId:any = this.sharedService.TenantData()?.levels.find(c=>c.levelName.toLocaleLowerCase()==data.levelName.toLocaleLowerCase())?.levelId;
     let subjectId:any = this.sharedService.TenantData()?.subjects.find(s=>s.subject_Name.toLocaleLowerCase()==data.subject.toLocaleLowerCase())?.subjectId;
     this.sharedService.NumberOfQuestion.set(this.numberOfQuestions);
     this.api.GetQuizByFilter(levelId,subjectId,this.numberOfQuestions).subscribe((res:any)=>{
        this.sharedService.QuizResponse.set(res)
       this.loaderService.hide()
       this.routs.navigate(['/quiz_start'])
        })


      }


}
