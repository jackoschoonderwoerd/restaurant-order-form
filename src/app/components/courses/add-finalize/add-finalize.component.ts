import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../courses.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-finalize',
  templateUrl: './add-finalize.component.html',
  styleUrls: ['./add-finalize.component.css']
})
export class AddFinalizeComponent implements OnInit {

  courseNames;

  constructor(
    private coursesService: CoursesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.courseNames = this.coursesService.getCourseNames();
    // console.log(this.courseNames);
  }
  onSelectCourse(courseName) {
    this.router.navigate(['/courses', {courseName: courseName}]);
  }
  onFinalizeOrder() {
    this.router.navigate(['/order']);
  }
}
