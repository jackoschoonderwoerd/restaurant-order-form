import { Injectable } from '@angular/core';
import { SoepService } from '../soep/soep.service';
import { CoursesService } from '../courses/courses.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orderedItems;
  soepOrders;

  constructor(
    private soepService: SoepService,
    private coursesSevice: CoursesService
  ) { }

  getMenu() {
    console.log(this.coursesSevice.getMenu('cenc'));
    return this.coursesSevice.getMenu('cenc')
  }

  getQuestions() {
    const questions = this.soepService.getQuestions()
    // console.log(questions);
  }
  getOrderedItems() {
    this.orderedItems = this.soepService.getCourseCosts() 
    console.log(this.orderedItems);
  }
  // getMyOrderedItems() {
  //   return this.orderedItems
  // }
  getItemOrders () {
    this.soepOrders = this.soepService.getCourseOrders();
  
  }
  postFinalOrder() {

  }
  deleteOrder() {
    
  }
}
