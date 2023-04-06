import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable,pipe } from 'rxjs';
// import { fromEvent, map } from 'rxjs'; 
import { map, filter, tap } from 'rxjs/operators'
import { Questions } from '../interface/questions';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private pathUrl ='http://localhost:1337/question';




  constructor(private http: HttpClient) { }


 

  getQuestionJson(): Observable<any[]> {
    return this.http.get<any[]>(this.pathUrl);
  }
  createNewUser(question:Questions): Observable<Questions>{
    return this.http.post<Questions>(`${this.pathUrl}/question`,question);
  }

  // public login(credential:any): Observable<boolean> {
  //   return this.http.post(this.pathUrl, credential).pipe(
  //    map((data:any) => {
  //      localStorage.setItem("token", data["token"]);
     
  //      return true;
  //    })
  //    );
  //   }

}
