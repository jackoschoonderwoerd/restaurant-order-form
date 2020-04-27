import { Component, OnInit, Input, EventEmitter, OnDestroy } from '@angular/core';
import { QuestionBase } from 'src/app/form-stuff/question-base';
import { FormGroup } from '@angular/forms';


import { SoepService } from '../../soep.service';
import { OrderedItem } from 'src/app/models/ordered-item.model';

@Component({
  selector: 'app-soep-list',
  templateUrl: './soep-list.component.html',
  styleUrls: ['./soep-list.component.css']
})
export class SoepListComponent implements OnInit {

  orderItemCosts: number = 0;
  orderItemTotalCosts: number = 0;
  

  constructor(private soepService: SoepService) { }

  @Input() question: QuestionBase<string>;
  @Input() form: FormGroup;
  get isValid() { return this.form.controls[this.question.key].valid; }

  ngOnInit(): void {
    const itemQuantity: number = this.soepService.getItemQuantity(this.question.name);
    this.form.patchValue({ [this.question.name]: itemQuantity });
    this.orderItemCosts = this.calculateItemCosts(itemQuantity, this.question.price);
  }

  change(e, question) {
    // console.log('e.value: ', e.value)
    const orderedItemQuantity = e.value;
    this.orderItemCosts = this.calculateItemCosts(orderedItemQuantity, question.price);
    const orderedItem = new OrderedItem(question.name, orderedItemQuantity);
    // console.log('orderedItem: ', orderedItem)
    this.soepService.addToOrUpdateOrderedItems(orderedItem);
    // localStorage.setItem(`${this.question.name} orderedItemQuantity`, orderedItemQuantity.toString());
    this.soepService.getCourseCosts()
  }

  private calculateItemCosts(itemsOrdered, itemPrice) {
    const itemCosts = itemsOrdered * itemPrice;
    this.orderItemTotalCosts = this.orderItemTotalCosts + itemCosts;
    // console.log(this.orderItemTotalCosts); 
    return itemCosts;
  }
}
