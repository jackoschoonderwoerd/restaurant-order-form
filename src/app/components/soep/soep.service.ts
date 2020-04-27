import { Injectable, EventEmitter } from '@angular/core';
import { QuestionBase } from 'src/app/form-stuff/question-base';
import { DropdownQuestion } from 'src/app/form-stuff/question-dropdown';
import { OrderItem } from '../../models/order-item.model'
import { of } from 'rxjs';
import { OrderedItem } from 'src/app/models/ordered-item.model';

@Injectable({
  providedIn: 'root'
})
export class SoepService {

  soepItems = [
    new OrderItem('uiensoep', 5),
    new OrderItem('doppertjes', 4.5),
    new OrderItem('broccoli', 1.25),
    new OrderItem('prei', 15)
    // 'uien',
    // 'tomatenpaprikasoep'
  ]

  itemType: string = 'soep'

  options = [
    { key: 0, value: 0 },
    { key: 1, value: 1 },
    { key: 2, value: 2 },
    { key: 3, value: 3 },
    { key: 4, value: 4 },
    { key: 5, value: 5 }
  ]
  questions: QuestionBase<string>[] = []
  orderItemTotalCosts: number = 0;
  orderItemTotalCostsChanged = new EventEmitter<number>();
  orderedItems: OrderedItem[] = []

  constructor() { }

  getQuestions() {
    this.questions = []
    this.soepItems.forEach(soepItem => {
      const item = new DropdownQuestion({
        key: soepItem.name,
        name: soepItem.name,
        price: soepItem.price,
        label: soepItem.name,
        options: this.options
      });
      this.questions.push(item)
    })
    this.getCourseCosts();
    return of(this.questions);
  }
  
  initializeOrderedItems() {
    const storedItems = JSON.parse(localStorage.getItem('storedItems'));
    if(storedItems) {
      this.orderedItems = storedItems;
    } else {
      this.orderedItems = [];
    }
  }

  addToOrUpdateOrderedItems(orderedItem: OrderedItem) {
    const index = this.orderedItems.findIndex(item => {
      return item.name === orderedItem.name;
    })
    console.log(index)
    if (index === -1) {
      console.log('index = -1, push()');
      this.orderedItems.push(orderedItem);
    } else {
      this.orderedItems[index].quantity = orderedItem.quantity
    }
    localStorage.setItem('storedItems', JSON.stringify(this.orderedItems));
  }

  getItemQuantity(itemName: string): number {
    const storedItems = JSON.parse(localStorage.getItem('storedItems'));
    if (this.orderedItems === [] && storedItems === null) {
      console.log('empty');
      return 0
    } else {
      console.log('else')
    this.orderedItems = storedItems;
      const filteredOrderedItem = this.orderedItems.filter(orderItem => {
        return orderItem.name === itemName;
      });
      if (filteredOrderedItem.length > 0) {
        const orderedItemQuantity = (
          filteredOrderedItem[0].quantity);
        return orderedItemQuantity;
      }
    }
  }

  getOrderedItems() {
    return this.orderedItems;
  }

  addToOrderItemTotalCosts(orderItemCosts) {
    this.orderItemTotalCosts = this.orderItemTotalCosts + orderItemCosts;
    this.orderItemTotalCostsChanged.emit(this.orderItemTotalCosts);
  }
  getCourseCosts() {
    let totalCourseCosts = 0
    this.orderedItems.forEach(item => {
      this.questions.forEach(question => {
        if(item.name === question.name) {
          totalCourseCosts = totalCourseCosts + item.quantity * +question.price;
        }
      })
      this.orderItemTotalCostsChanged.emit(totalCourseCosts);
    })
  }
  getCourseOrders() {
    this.initializeOrderedItems();
    this.getQuestions();
    let courseOrders = [];
    this.orderedItems.forEach(item => {
      this.questions.forEach(question => {
        if(item.name === question.name) {
          courseOrders.push({name: item.name, price: question.price, quantity: item.quantity, itemType: this.itemType});
        }
      })
    })
    return {courseOrders: courseOrders, itemType: this.itemType};
  }
}
