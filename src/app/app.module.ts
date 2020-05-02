import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/navigation/header/header.component';
import { SidenavComponent } from './components/navigation/sidenav/sidenav.component';



import { TestComponent } from './components/test/test.component';


import { OrderComponent } from './components/order/order.component';
import { AddToOrderComponent } from './components/dialogs/add-to-order/add-to-order.component';
import { ContinueOrderingComponent } from './components/dialogs/continue-ordering/continue-ordering.component';
import { OrderFormComponent } from './components/order/order-form/order-form.component';
import { FinalizeErrorDialogComponent } from './components/order/finalize-error-dialog/finalize-error-dialog.component';
import { FinalizeOrderDialogComponent } from './components/order/finalize-order-dialog/finalize-order-dialog.component';

import { CoursesComponent } from './components/courses/courses.component';
import { CourseItemComponent } from './components/courses/course-item/course-item.component';
import { OrderCourseComponent } from './components/order/order-course/order-course.component';
import { AddFinalizeComponent } from './components/courses/add-finalize/add-finalize.component';
import { CourseItemInfoDialogComponent } from './components/courses/course-item/course-item-info-dialog/course-item-info-dialog.component';

import { MaaltijddealInfoDialogComponent } from './components/order/maaltijddeal-info-dialog/maaltijddeal-info-dialog.component';
import { BorreldealInfoDialogComponent } from './components/order/borreldeal-info-dialog/borreldeal-info-dialog.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
  ],
  declarations: [
    AppComponent,
    // DynamicFormComponent,
    // DynamicFormQuestionComponent,
    HomeComponent,
    HeaderComponent,
    SidenavComponent,
    TestComponent,
    OrderComponent,
    AddToOrderComponent,
    ContinueOrderingComponent,
    OrderFormComponent,
    FinalizeErrorDialogComponent,
    FinalizeOrderDialogComponent,
    CoursesComponent,
    CourseItemComponent,
    OrderCourseComponent,
    AddFinalizeComponent,
    CourseItemInfoDialogComponent,
    
    MaaltijddealInfoDialogComponent,
    BorreldealInfoDialogComponent,

  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    AddToOrderComponent,
    ContinueOrderingComponent
  ]
})
export class AppModule {
  constructor() {
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/