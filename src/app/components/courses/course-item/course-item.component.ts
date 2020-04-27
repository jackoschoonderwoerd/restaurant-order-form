import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { CourseItem } from 'src/app/models/courseItem.model';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { CoursesService } from '../courses.service';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.css']
})
export class CourseItemComponent implements OnInit {

  @Input() courseName;
  @Input() courseItem;
  options: number[] = [0, 1, 2, 3];
  default: number = 2;
  courseItemTotal: number = 0;
  itemOrderForm: FormGroup
  

  constructor(
    private formBuilder: FormBuilder,
    private coursesService: CoursesService
    ) {}

  ngOnInit(): void {
    this.itemOrderForm = new FormGroup({
      amount: new FormControl(null)
    });
    this.itemOrderForm.controls['amount'].setValue(this.courseItem.amount, {onSelf: true});
    this.courseItemTotal = this.calculateCourseItemTotal();
  }

  onChange(e) {
    this.courseItem.amount = e.target.value;
    this.courseItemTotal = this.courseItem.amount * this.courseItem.price;
    this.coursesService.addOrUpdateOrder(this.courseName, this.courseItem)
  }
  calculateCourseItemTotal() {
    return this.courseItem.price * this.courseItem.amount;
  }
}
