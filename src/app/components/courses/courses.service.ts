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
  getCourse(courseName) {
    // console.log(this.cencMenu);
    this.cencMenu.courses.forEach(course => {
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
    const courseItems = []
    this.cencMenu.courses.forEach(course => {
      if(course.courseName === courseName) {
        courseItems.push(course.courseItems);
      }
      console.log(courseItems);
    })
    let courseTotal: number = 0
    this.orderedItems.forEach((orderedItem) => {
      console.log(orderedItem.courseItemAmount);
        courseItems.forEach(courseItem => {
          console.log(courseItem);
          if(orderedItem.name === courseItem.name) {
            courseTotal = courseTotal + orderedItem.courseItemAmount * courseItem.price; 
          }
        })
      });
      // if(orderedItem.courseName === courseName) {
      //   const orderItemTotal = orderedItem.courseItem.price * orderedItem.courseItem.amount;
      //   courseTotal = courseTotal + orderItemTotal
      // }
    
    console.log(courseTotal);
    this.courseTotalChanged.emit(courseTotal);
  }
}

