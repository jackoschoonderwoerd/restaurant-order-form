import { Component, OnInit, Input } from '@angular/core';
import { CoursesService } from './courses.service';
import { ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { Course } from 'src/app/models/course.model';
import { CourseItem } from 'src/app/models/courseItem.model';
import { FormGroup } from '@angular/forms';
import { QuestionControlService } from 'src/app/form-stuff/question-control.service';
import { QuestionBase } from 'src/app/form-stuff/question-base';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  constructor(
    private coursesService: CoursesService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private qcs: QuestionControlService) { }

  course: Course;
  courseName: string;
  // @Input ()courseItems: QuestionBase<string>[];
  courseItems: CourseItem[];
  form: FormGroup;
  courseTotal: number = 0;


  ngOnInit(): void {
    this.coursesService.getMenu('cenc');
    this.cdr.detectChanges()
    const courseName = this.route.snapshot.params['courseName']
    this.course = this.coursesService.getCourse(courseName)[0];
    this.courseName = this.course['courseName'];
    this.courseItems = this.course['courseItems']
    this.coursesService.courseTotalChanged.subscribe(
      ((courseTotal: number) => {
        this.courseTotal = courseTotal;
      })
    );
  }
}
