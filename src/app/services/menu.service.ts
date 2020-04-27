import { Injectable } from '@angular/core';
import { Course } from '../models/course.model';
import { CourseItem } from '../models/courseItem.model';
import { Menu } from '../models/menu.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  selectedMenu: Menu;

  // menus: Menu[] = [
  //   new Menu(
  //     'cenc',[
  //     new Course('zout', [
  //       new CourseItem('drop', 1),
  //       new CourseItem('kaas', 2.5)
  //     ]),
  //     new Course('warm', [
  //       new CourseItem('cacao', 1)
  //     ])
  //   ]),
  //   new Menu(
  //     'bogus',[
  //     new Course('zoet', [
  //       new CourseItem('ijs', 1),
  //       new CourseItem('cake', 2.5)
  //     ]),
  //     new Course('fris', [
  //       new CourseItem('cola', 1)
  //     ])
  //   ])
  // ]


  bogus = new Menu([
    new Course('zoet', [
      new CourseItem('ijs', 1),
      new CourseItem('cake', 2.5)
    ]),
    new Course('fris', [
      new CourseItem('cola', 1)
    ])
  ]);

  cenc = new Menu([
    new Course('soep', [
      new CourseItem('broccoli', 11.25),
      new CourseItem('prei', 30.50),
    ]),
    new Course('borrelhapjes', [
      new CourseItem('bitterballen', 1.10),
      new CourseItem('kaasstengels', 1.75)
    ])
  ]);

  

  getMenu(companyName) {
    return this.cenc;
  }
  getCourseList(companyName) {
    // called by sidenav.component.ts
    let courseList: string[] = [];
    this.cenc.courses.forEach(course => {
      courseList.push(course.courseName);
    });
    return courseList;
  }
  
}

