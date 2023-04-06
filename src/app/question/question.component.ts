import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { interval } from 'rxjs';
import { QuestionService } from '../service/question.service';
import { timer, Subscription } from 'rxjs';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  public name: string = "";
  public questionList: any;
  public currentQuestion: number = 0;
  public points: number = 0;
  counter = 0;
  correctAnswer: number = 0;
  inCorrectAnswer: number = 0;
  interval$: any;
  progress: string = "0";
  isQuizCompleted: boolean = false;
  data: any = [];
  myForm!: FormGroup;
  tick = 1000;
  count = 10000;
  increase = 1;
  countDown!: Subscription;
  answer:string = "Answer Not selected Yet";
  prevAnswered=[];
  // counting = 0;


  constructor(private questionService: QuestionService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.name = localStorage.getItem("name")!;
    
      this.countDown = timer(0, this.tick).subscribe((count) => {
      if (this.counter == 0 && count) {
        console.log('timer completed', count, this.counter);
        if (this.countDown) {
          this.countDown.unsubscribe();
        }
      }
    ++this.counter;
    });
    
    setTimeout(() => {
      this.isQuizCompleted = true;
      this.countDown.unsubscribe();
    }, 100000);


    this.getAllQuestions();
    this.myForm = this.fb.group({
      opt: ['', Validators.required],
    })
  }

  onSubmit() {
    console.log(this.answer)
  }


  sendData(val: any) {
    this.isQuizCompleted = true;
    console.log(this.questionList[this.currentQuestion]?.id)
    console.log(val);
  }

  getAllQuestions() {


    this.questionService.getQuestionJson().subscribe(
      (res:any)=>{
      this.questionList=res;
      console.log(res);
       } );

    // this.questionService.getQuestionJson()
    //   .subscribe((res: any[]) => {
    //     this.questionList = res;
    //       console.log(res)
    //   })
  }
  nextQuestion(currentQno: number, correct: any) {
    this.increase++;
    this.currentQuestion+1;
    
    if (currentQno === this.questionList.length) {
      this.interval$.unsubscribe();
      this.counter = 0;
    }
    if (correct) {
      this.points += 10;
      this.correctAnswer++;
    
      this.getProgressPercent();
    } else {
      this.currentQuestion++;
      this.inCorrectAnswer++;
      this.points -= 10;
      setTimeout(() => {
        this.getProgressPercent();
      }, 1000);
    }

  }

  previousQuestion() {
    this.currentQuestion--;
    this.increase--
  }

  finish() {

    this.isQuizCompleted = true;
  }

  // answer(currentQno: number, option: any) {

  //   if (currentQno === this.questionList.length) {
  //     this.isQuizCompleted = true;
  //     this.stopCounter();
  //   }
  //   if (option.correct) {
  //     this.points += 10;
  //     this.correctAnswer++;
  //     setTimeout(() => {
  //       // this.currentQuestion++;
  //       this.resetCounter();
  //       this.getProgressPercent();
  //     }, 1000);


  //   } else {
  //     setTimeout(() => {
  //       this.currentQuestion++;
  //       this.inCorrectAnswer++;
  //       this.resetCounter();
  //       this.getProgressPercent();
  //     }, 1000);

  //     this.points -= 10;
  //   }
  // }
 
  stopCounter() {
    this.interval$.unsubscribe();
    this.counter = 0;
  }
  getProgressPercent() {
    this.progress = ((this.currentQuestion / this.questionList.length) * 100).toString();
    return this.progress;

  }
}
