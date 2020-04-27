import { Component }       from '@angular/core';

import { QuestionService } from './question.service';
import { QuestionBase }    from './form-stuff/question-base';
import { Observable }      from 'rxjs';
import { CoursesService } from './components/courses/courses.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css'
  ],
  providers:  [QuestionService]
})
export class AppComponent {
  questions$: Observable<QuestionBase<any>[]>;

  constructor(
    service: QuestionService,
    private coursesService: CoursesService) {

    this.questions$ = service.getQuestions()
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/