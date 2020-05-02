import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { CourseItem } from 'src/app/models/courseItem.model';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { CoursesService } from '../courses.service';
import { MatDialog } from '@angular/material/dialog';
import { CourseItemInfoDialogComponent } from './course-item-info-dialog/course-item-info-dialog.component';

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
    private coursesService: CoursesService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.itemOrderForm = new FormGroup({
      amount: new FormControl(null)
    });
    this.itemOrderForm.controls['amount'].setValue(this.courseItem.amount, { onSelf: true });
    this.courseItemTotal = this.calculateCourseItemTotal();
    setTimeout(() => {
      this.coursesService.calculateCourseTotal(this.courseName);
    });
  }

  onChange(e) {
    this.courseItem.amount = e.target.value;
    this.courseItemTotal = this.courseItem.amount * this.courseItem.price;
    this.coursesService.addOrUpdateOrderItem(this.courseName, this.courseItem)
  }

  onCourseItemName(courseItem) {
    if (courseItem.description) {
      console.log(courseItem);
      this.dialog.open(CourseItemInfoDialogComponent,
        {
          data: {
            courseItem: courseItem
          }
        })
    }
  }

  calculateCourseItemTotal() {
    // console.log('calculateCourseItemTotal() called')
    return this.courseItem.price * this.courseItem.amount;
  }
  determineInfoStyle() {
    return this.courseItem.description ? 'pointer' : '';
  }
}
