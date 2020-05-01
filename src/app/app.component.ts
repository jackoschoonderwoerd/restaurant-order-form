import { Component, OnInit }       from '@angular/core';
import { Observable }      from 'rxjs';
import { CoursesService } from './components/courses/courses.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css'
  ],
})
export class AppComponent implements OnInit {

  constructor(
    private coursesService: CoursesService) {
  }
  ngOnInit() {
    this.coursesService.getMenu('cenc');
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/