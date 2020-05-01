import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-order-course',
  templateUrl: './order-course.component.html',
  styleUrls: ['./order-course.component.css']
})
export class OrderCourseComponent implements OnInit {

  @Input() course;
  constructor(
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    // this.course.courseItems.forEach(courseItem => {
    //   console.log(courseItem.name);
    //   console.log(courseItem.amount);
    //   console.log(typeof(courseItem.amount));
    // })
  }
  onEdit(courseName) {
    // console.log(courseName);
    this.router.navigate(['/courses', {courseName: courseName}])
  }
  
}
