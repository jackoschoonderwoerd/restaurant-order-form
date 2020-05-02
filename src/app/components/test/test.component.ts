import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../courses/courses.service';


@Component({
  selector: 'app-test',
  templateUrl: 'test.component.html',
  styleUrls: ['test.component.css']
})
export class TestComponent implements OnInit {

  arrayOfElements = [{
    "name": "a",
    "subElements": [{
      "surname": 1
    }, {
      "surname": 2
    }]
  }, {
    "name": "b",
    "subElements": [{
      "surname": 3
    }, {
      "surname": 1
    }]
  }, {
    "name": "c",
    "subElements": [{
      "surname": 2
    }, {
      "surname": 5
    }]
  }];

  constructor(private coursesService: CoursesService) { }

 

  ngOnInit(): void {
    let filteredArray = this.arrayOfElements
    .filter((element) => 
        element.subElements.some((subElement) => subElement.surname === 1))
    .map(element => {
        let newElt = Object.assign({}, element); // copies element
        newElt.subElements = newElt.subElements.filter(subElement => subElement.surname === 1); 
        return newElt;
    });
    console.log(filteredArray);
  }
  
}
