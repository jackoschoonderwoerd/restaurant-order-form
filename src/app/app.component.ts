import { Component, OnInit }       from '@angular/core';
import { Observable }      from 'rxjs';
import { CoursesService } from './components/courses/courses.service';
import { OrderService } from './components/order/order.service';
import { MatDialog } from '@angular/material/dialog';
import { NietInGebruikDialogComponent } from './niet-in-gebruik-dialog/niet-in-gebruik-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css'
  ],
})
export class AppComponent implements OnInit {

  loadingStatus: boolean = false;

  constructor(
    private coursesService: CoursesService,
    private orderService: OrderService,
    private dialog: MatDialog) {
    
  }
  ngOnInit() {
    this.dialog.open(NietInGebruikDialogComponent);
    this.coursesService.getMenu('cenc');
    this.orderService.loadingStatusChanged.subscribe((loadingStatus: boolean) => {
      this.loadingStatus = loadingStatus;
    });
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/