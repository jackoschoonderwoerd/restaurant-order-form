import { Component, OnInit, Output, EventEmitter, ApplicationRef, OnDestroy } from '@angular/core';
import { Course } from 'src/app/models/course.model';
import { CoursesService } from '../../courses/courses.service';
import { Menu } from 'src/app/models/menu.model';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit, OnDestroy {

  // courseNames: string[];
  menu: Menu;
  course;
  courseNames: string[] = [];
  @Output() sidenavToggle = new EventEmitter<void>();

  mySubscription: any;

  constructor(
    private coursesService: CoursesService,
    private router: Router,) {

    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
      }
    });
  }

  ngOnInit(): void {
    this.menu = this.coursesService.getMenu()
    this.menu.courses.forEach((course: Course) => {
      const courseName = (course.courseName);
      this.courseNames.push(courseName);
    });
  }
  onSidenavToggle() {
    this.sidenavToggle.emit();
  }
  courseSelected(courseName) {
    this.onSidenavToggle();
    this.course = this.coursesService.getCourse(courseName);
    console.log(this.course);
    this.router.navigate(['/courses', { courseName: courseName }]);
  }

  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }
}
