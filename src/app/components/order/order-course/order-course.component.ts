import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-course',
  templateUrl: './order-course.component.html',
  styleUrls: ['./order-course.component.css']
})
export class OrderCourseComponent implements OnInit {

  @Input() course;
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  onEdit(courseName) {
    console.log(courseName);
    this.router.navigate(['/courses', {courseName: courseName}])
  }
}
