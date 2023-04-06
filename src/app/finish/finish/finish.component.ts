import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-finish',
  templateUrl: './finish.component.html',
  styleUrls: ['./finish.component.scss']
})
export class FinishComponent implements OnInit {

  isQuizCompleted: boolean = false;
  public questionList: any = [];
  correctAnswer: number = 0;
  inCorrectAnswer: number = 0;
  public points: number = 0;
  constructor() { }

  ngOnInit(): void {
    
  }

}
