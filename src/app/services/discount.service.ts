import { Injectable } from '@angular/core';
import { Discounts } from '../models/discounts.model';
import { Discount } from '../models/discount.model';
import { CoursesService } from '../components/courses/courses.service';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  discounts: Discount[] = [];

  discountItems: Array<{numeratorName: string, denumeratorName: string, discount: number, minPrice: number}> =     
    [
      {numeratorName: 'bier', denumeratorName: 'borrelhapjes', discount: 1, minPrice: 3},
      {numeratorName: 'maaltijden', denumeratorName: 'wijn', discount: 2, minPrice: 0}
    ];
      
  

  constructor(
    private coursesService: CoursesService
  ) { }

  getDiscount(): Array<{name: string, amount: number}> {
    const collections = this.coursesService.getCourseItemsNamesPricesAmounts()
    collections.forEach(collection => {
      this.discountItems.forEach(discountItem => {
        let numeratorName = '';
        let denumeratorName = '';
        if(collection.name === discountItem.numeratorName && collection.price > discountItem.minPrice) {
          numeratorName = discountItem.numeratorName
          denumeratorName = discountItem.denumeratorName
        }
        collections.forEach(collection => {
          let numeratorAmount = 0;
          let denumeratorAmount = 0;
          if(collection.name === numeratorName) {
            numeratorAmount = numeratorAmount + collection.amount
          } else if (collection.name === denumeratorName) {
            denumeratorAmount = denumeratorAmount + collection.amount
          }
          // console.log(numeratorAmount, denumeratorAmount);
        })
        // console.log(numeratorName, denumeratorName);
      })
    })
    // return this.coursesService.getCourseItemsNamesPricesAmounts();
    // console.log(namesAndAmount);
    return [{name: 'bier', amount: 6}, {name: 'maaltijden', amount: 3}];
  }
  
  // getDiscount( courseItem, numerator, denumerator): {discount: number, price: number } {
  //   let discount = 0 ;
  //   const maxDiscount = Math.floor(numerator / 2);
  //   if(denumerator > maxDiscount) {
  //     discount = maxDiscount
  //   } else {
  //     discount = denumerator
  //   }
  //   this.discounts.push(new Discount(courseItem , discount , discount * this.discountItems.borrelHapjes))
  //   return {discount: discount, price: discount * this.discountItems.borrelHapjes};
  // }
}
