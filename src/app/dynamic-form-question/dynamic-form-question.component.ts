import { Component, Input, OnInit } from '@angular/core';
import { FormGroup }        from '@angular/forms';

import { QuestionBase }     from '../form-stuff/question-base';

@Component({
  selector: 'app-question',
  templateUrl: './dynamic-form-question.component.html',
  styleUrls: [
    './dynamic-form-question.component.css'
  ] 
})
export class DynamicFormQuestionComponent implements OnInit {
  @Input() question: QuestionBase<string>;
  @Input() form: FormGroup;
  get isValid() { return this.form.controls[this.question.key].valid; }
  
  ngOnInit() {
    console.log(this.question);
  }

  change(e) {
    console.log(e)
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/