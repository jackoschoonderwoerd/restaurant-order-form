
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { DynamicFormQuestionComponent } from './dynamic-form-question/dynamic-form-question.component';
import { SoepFormComponent } from './components/soep/soep-form/soep-form.component';
import { TestComponent } from './components/test/test.component';
import { OrderComponent } from './components/order/order.component';
import { CoursesComponent } from './components/courses/courses.component';




const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'soep', component: SoepFormComponent },
  { path: 'dynamic-form', component: DynamicFormComponent},
  { path: 'dynamic-form-question', component: DynamicFormQuestionComponent},
  { path: 'test', component: TestComponent },
  { path: 'order', component: OrderComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {}