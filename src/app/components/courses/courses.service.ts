import { Injectable, EventEmitter } from '@angular/core';


import { Course } from 'src/app/models/course.model';
import { CourseItem } from 'src/app/models/courseItem.model';
import { ActivatedRoute } from '@angular/router';
import { OrderItem } from 'src/app/models/order-item.model';
import { OrderedItem } from 'src/app/models/ordered-item.model';
import { NewOrderedItem } from 'src/app/models/new-ordered-item.model';
import { Menu } from 'src/app/models/menu.model';
import { MenuService } from 'src/app/services/menu.service';




@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  

  courseAmount: number = 0;
  courseTotalChanged = new EventEmitter<number>();
  orderedItems = [];
  
  menu;  

  courseNames: string[] = []

  constructor(private menuService: MenuService) { }

  getMenu(cenc) {
    // called by app.component.ts
    this.menu = this.menuService.getMenu('cenc');
    if(localStorage.getItem('orderedItems')) {
      this.orderedItems = JSON.parse(localStorage.getItem('orderedItems'));
      this.menu.courses.forEach(course => {
        const courseItem = course.courseItems;
        courseItem.forEach(courseItem => {
          this.orderedItems.forEach(orderedItem => {
            if(courseItem.name === orderedItem.courseItemName){
              courseItem.amount = orderedItem.courseItemAmount;
            }
          })
        })
      });
    }
    return this.menu;
  }

  getCourseNames() {
    if(this.courseNames = []) {
      this.menu.courses.forEach(course => {
        this.courseNames.push(course.courseName)
      });
    }
    return this.courseNames
  }

  getOrderedItems() {
    if(localStorage.getItem('orderedItems')) {
      this.orderedItems = JSON.parse(localStorage.getItem('orderedItems'));
      // console.log(this.orderedItems);
    }  else {
      this.orderedItems = [];
    }
    // console.log('course.service:this.orderedItems: ', this.orderedItems);
    return this.orderedItems;
  }

  getCourse(courseName):Course[] {

    const selectedCourse = this.menu.courses.filter((course) => {
      return course.courseName === courseName;
    })
    // console.log(selectedCourse);
    return selectedCourse;
  }

  addOrUpdateOrderItem(courseName: string, courseItem: CourseItem) {
    
   
    // create newOrderedItem
    const newOrderedItem = new NewOrderedItem(courseName, courseItem.name, courseItem.amount);
    // check to see if this newOrderedItem has already been ordered
    const index = this.orderedItems.findIndex((orderedItem: NewOrderedItem) => {
      return orderedItem.courseItemName === courseItem.name && orderedItem.courseName === courseName;
    });
    // if not; add the newOrderedItem to orderdItems
    if(index === -1) {
      this.orderedItems.push(newOrderedItem)
    } else {
      // else update the amount of the already orderedItem
      this.orderedItems[index].courseItemAmount = courseItem.amount
    }
    this.storeOrderedItemsInLocalStorage();
    this.calculateCourseTotal(courseName)
  }

  storeOrderedItemsInLocalStorage() {
    localStorage.setItem('orderedItems', JSON.stringify(this.orderedItems));
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
  calculateOrderTotal() {
    let total = 0
    const menu = this.getMenu('');
    console.log(menu);
    if(localStorage.getItem('orderedItems')) {
      const orderedItems = JSON.parse(localStorage.getItem('orderedItems'));
      console.log(orderedItems);
      menu.courses.forEach(course => {
        const courseItems = course.courseItems
        console.log(courseItems);
        courseItems.forEach(courseItem => {
          orderedItems.forEach(orderedItem => {
            console.log(courseItem.name, orderedItem.courseItemName);
            if(courseItem.name === orderedItem.courseItemName) {
              console.log(courseItem.price, orderedItem.amount);
              const subTotal = courseItem.price * orderedItem.courseItemAmount;
              console.log(subTotal);
              total = total + subTotal;
            }
          })
        })
      })
    }
    console.log(total)
    return total;
  }
}

