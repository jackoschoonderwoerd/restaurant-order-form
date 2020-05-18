import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddToOrderComponent } from '../dialogs/add-to-order/add-to-order.component';
import { AddFinalizeComponent } from '../courses/add-finalize/add-finalize.component';
import { Course } from 'src/app/models/course.model';
import { CoursesService } from '../courses/courses.service';
import { CompanyService } from 'src/app/services/company.service';
import { Company } from 'src/app/models/company.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  courseNames: string[] = []

  company: Company

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private companyService: CompanyService
    ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.companyService.getTestCompany(params['companyname']);
      
      console.log(params['companyname']);
    })
  }
  onBestellen() {
    this.dialog.open(AddFinalizeComponent);
  }
  
}
