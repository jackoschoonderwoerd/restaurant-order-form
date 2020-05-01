import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddToOrderComponent } from '../dialogs/add-to-order/add-to-order.component';
import { AddFinalizeComponent } from '../courses/add-finalize/add-finalize.component';
import { Course } from 'src/app/models/course.model';
import { CoursesService } from '../courses/courses.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  courseNames: string[] = []

  constructor(
    private router: Router,
    private dialog: MatDialog,
    ) { }

  ngOnInit(): void {
  }
  onBestellen() {
    this.dialog.open(AddFinalizeComponent);
  }
  
}
