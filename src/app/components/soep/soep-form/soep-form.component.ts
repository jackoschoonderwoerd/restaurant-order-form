import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { QuestionBase } from 'src/app/form-stuff/question-base';
import { FormGroup } from '@angular/forms';
import { QuestionControlService } from 'src/app/form-stuff/question-control.service';
import { SoepService } from '../soep.service';
import { MatDialog } from '@angular/material/dialog';
import { AddToOrderComponent } from '../../dialogs/add-to-order/add-to-order.component';


@Component({
  selector: 'app-soep-form',
  templateUrl: './soep-form.component.html',
  styleUrls: ['./soep-form.component.css']
})
export class SoepFormComponent implements OnInit {

  // questions = new QuestionBase();
  questions;
  @Input() question: QuestionBase<string>[] = [];
  form: FormGroup;
  payLoad = '';
  orderItemTotalCosts: number = 0;

  constructor(
    private qcs: QuestionControlService,
    private soepService: SoepService,
    private dialog: MatDialog) {  }

  ngOnInit() {

    this.soepService.initializeOrderedItems();
    this.soepService.orderItemTotalCostsChanged.subscribe(
      (orderItemTotalCosts: number) => {
        this.orderItemTotalCosts = orderItemTotalCosts;
      }
    );
    this.questions = null;

    this.soepService.getQuestions().subscribe(
      questions => {
        console.log(questions);
        this.questions = questions;
      }
    );
    this.form = this.qcs.toFormGroup(this.questions);
    this.soepService.orderItemTotalCostsChanged.subscribe(
      (orderItemTotalCosts: number) => {
        this.orderItemTotalCosts = orderItemTotalCosts
      }
    );
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.getRawValue());
    this.dialog.open(AddToOrderComponent);
  }
  

}
