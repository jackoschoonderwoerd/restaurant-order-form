import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';


// import { DynamicFormQuestionComponent } from './dynamic-form-question/dynamic-form-question.component';
// import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/navigation/header/header.component';
import { SidenavComponent } from './components/navigation/sidenav/sidenav.component';

import { SoepFormComponent } from './components/soep/soep-form/soep-form.component';
import { SoepListComponent } from './components/soep/soep-form/soep-list/soep-list.component';
import { TestComponent } from './components/test/test.component';

import { QuestionControlService } from './form-stuff/question-control.service';
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



@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AppRoutingModule,
    MaterialModule
  ],
  declarations: [
    AppComponent,
    // DynamicFormComponent,
    // DynamicFormQuestionComponent,
    HomeComponent,
    HeaderComponent,
    SidenavComponent,
    SoepListComponent,
    SoepFormComponent,
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

  ],
  providers: [QuestionControlService],
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