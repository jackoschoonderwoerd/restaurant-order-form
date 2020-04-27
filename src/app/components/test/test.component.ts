import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../courses/courses.service';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor(private coursesService: CoursesService) { }

 

  ngOnInit(): void {
    // console.log(this.coursesService.getCourses());   
  }
}
