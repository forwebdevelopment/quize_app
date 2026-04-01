import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Shared } from '../../shared/shared';

@Component({
  selector: 'app-results',
  imports: [],
  templateUrl: './results.html',
  styleUrl: './results.css',
})
export class Results {
 totalQuestions = 100;
  correctAnswers = 85;
  score:number=0
  constructor(private router: Router , public shared:Shared)
  {



  }

  ngOnInit(){

  this.score = Math.round((this.shared.NumberOfCurrectQuestion() /this.shared.NumberOfQuestion()) * 100);
  }
  reviewAnswers() {
    // Navigate to review page (you can define a route like /review)

    this.router.navigate(['/quiz_start'] ,{fragment:'review'});
  }

}
