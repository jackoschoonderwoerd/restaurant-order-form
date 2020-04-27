import { Injectable } from '@angular/core';

import { DropdownQuestion } from './form-stuff/question-dropdown';
import { QuestionBase } from './form-stuff/question-base';
import { TextboxQuestion } from './form-stuff/question-textbox';
import { of } from 'rxjs';
import { CheckboxQuestion } from './form-stuff/question-checkbox';

@Injectable()
export class QuestionService {

snacks = [
  'ham',
  'kaas'
]
options = [
  { key: 1, value: 1 },
          { key: 2, value: 2 },
          { key: 3, value: 3 },
          { key: 4, value: 4 }
]
questions: QuestionBase<string>[] = []

  getQuestions() {
    this.snacks.forEach(snack => {
      const item = new DropdownQuestion({
        key: snack,
        label: snack,
        options: this.options
      })
      this.questions.push(item)
    })
    // console.log(this.questions);
    return of(this.questions);
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/