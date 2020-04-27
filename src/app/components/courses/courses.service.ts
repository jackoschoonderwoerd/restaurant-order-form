import { Injectable, EventEmitter } from '@angular/core';


import { Course } from 'src/app/models/course.model';
import { CourseItem } from 'src/app/models/courseItem.model';
import { ActivatedRoute } from '@angular/router';
import { OrderItem } from 'src/app/models/order-item.model';
import { OrderedItem } from 'src/app/models/ordered-item.model';
import { NewOrderedItem } from 'src/app/models/new-ordered-item.model';

import { Menu } from 'src/app/models/menu.model';


@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  courseAmount: number = 0;
  courseTotalChanged = new EventEmitter<number>();
  orderedItems = [];
  

  bogusMenu = new Menu([
    new Course('zoet', [
      new CourseItem('ijs', 1),
      new CourseItem('cake', 2.5)
    ]),
    new Course('fris', [
      new CourseItem('cola', 1)
    ])
  ]);

  cencMenu = new Menu([
    new Course('soep', [
      new CourseItem('broccoli', 11.25),
      new CourseItem('prei', 30.50),
    ]),
    new Course('borrelhapjes', [
      new CourseItem('bitterballen', 1.10),
      new CourseItem('kaasstengels', 1.75)
    ])
  ])

  courseNames: string[] = []

  constructor() { }

  getMenu() {
    return this.cencMenu;
  }

  getCourse(courseName):Course[] {
    // console.log(this.cencMenu);
    this.bogusMenu.courses.forEach(course => {
      // console.log(course);
    })
    if ((JSON.parse(localStorage.getItem('order')))) {
      const storedMenu = (JSON.parse(localStorage.getItem('order')))
      // console.log('storedMenu: ', storedMenu)
    }
    // console.log('this.cencMenu: ', this.cencMenu);
    const selectedCourse = this.cencMenu.courses.filter((course) => {
      return course.courseName === courseName;
    })
    console.log(selectedCourse);
    return selectedCourse;
  }

  addOrUpdateOrder(courseName: string, courseItem: CourseItem) {
    // console.log(courseItem);
    const newOrderedItem = new NewOrderedItem(courseName, courseItem.name, courseItem.amount)
    const index = this.orderedItems.findIndex((orderedItem: NewOrderedItem) => {
      return orderedItem.courseItemName === courseItem.name && orderedItem.courseName === courseName;
    });

    if(index === -1) {
      this.orderedItems.push(newOrderedItem)
    } else {
      this.orderedItems[index].courseItemAmount = courseItem.amount
    }
    localStorage.setItem('orderedItems', JSON.stringify(this.orderedItems));
    this.calculateCourseTotal(courseName)
  }

  calculateCourseTotal(courseName) {
    let courseTotal: number = 0;
    const courseArray: Course[] = this.getCourse(courseName)
    const course = courseArray[0];
    course.courseItems.forEach(courseItem => {
      if(courseItem.amount !== undefined) {
        courseTotal = courseTotal + courseItem.price * courseItem.amount
      }
    })
    this.courseTotalChanged.emit(courseTotal);
  }
}

