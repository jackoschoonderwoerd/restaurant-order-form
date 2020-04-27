import { Injectable } from '@angular/core';
import { Course } from '../models/course.model';
import { CourseItem } from '../models/courseItem.model';


@Injectable({
  providedIn: 'root'
})
export class MyCoursesService {

  cencMenu: Course[] = [
    new Course('soep', [
      new CourseItem('broccoli', 1.25),
      new CourseItem('prei', 1.50)
    ]),
    new Course('borrelhapjes', [
      new CourseItem('bitterballen', 1.10),
      new CourseItem('kaasstengels', 1.75)
    ])
  ]

  constructor() { }

  getCourses() {
    this.cencMenu.forEach(item => {
      console.log(item);
    })
  }
}
