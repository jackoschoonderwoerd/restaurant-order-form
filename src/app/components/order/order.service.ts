import { Injectable } from '@angular/core';
import { SoepService } from '../soep/soep.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orderedItems;
  soepOrders;

  constructor(
    private soepService: SoepService
  ) { }

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
