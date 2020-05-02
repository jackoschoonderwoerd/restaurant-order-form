import { Injectable } from '@angular/core';
import { Course } from '../models/course.model';
import { CourseItem } from '../models/courseItem.model';
import { Menu } from '../models/menu.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  selectedMenu: Menu;
  
  bogus = new Menu([
    new Course('zoet', [
      new CourseItem('ijs', 1, '', '', 0),
      new CourseItem('cake', 2.5)
    ]),
    new Course('fris', [
      new CourseItem('cola', 1)
    ])
  ]);

  cenc = new Menu([
    new Course('soep', [
      new CourseItem('tomatenpaprika', 5, '', '', 0),
    ]),
    new Course('borrelhapjes', [
      new CourseItem('Friet klein', 4, '', '', 0),
      new CourseItem('Friet groot', 10, '', '', 0),
      new CourseItem('Ketchup', .5, '', '', 0),
      new CourseItem('Mayonaise', .5, '', '', 0),
      new CourseItem('bitterballen', 5, '', '', 0),
      new CourseItem('kaasstengels', 5, '', '', 0),
      new CourseItem('calamares', 5, '', '', 0),
      new CourseItem('Chinese loempiaatjes (vegetarisch)', 5, '', '', 0),
    ]),
    new Course('maaltijden', [
      new CourseItem(
        'Ossobuco',
        14.5,
        'Italiaanse kalfsschenkel in tomaten-wijnsaus met rosevalaardappelen, groente en salade',
        'https://captein-en-co.s3.eu-central-1.amazonaws.com/images/course-items/ossobuco.jpg',
        0),
      new CourseItem(
        'Pasta',
        12.5, 
        'Pasta met courgette-muntsaus, rode paprika en Parmezaanse kaas, met salade',
        'https://captein-en-co.s3.eu-central-1.amazonaws.com/images/course-items/pasta-courgette.jpg',
        0)
    ]),
    new Course('zoet', [
      new CourseItem('appeltaart', 4, '', '', 0),
      new CourseItem('chocolade-truffeltaart', 10, '', '', 0),
    ]),
    new Course('bier', [
      new CourseItem('Amstel 0.0', 3.5, '', '', 0),
      new CourseItem('wieckse witte 0.0', 3.5, '', '', 0),
      new CourseItem('Duvel', 3.5, '', '', 0),
      new CourseItem('la chouffe', 3.5, '', '', 0),
      new CourseItem('leffe blond', 3.5, '', '', 0),
      new CourseItem('IJ-wit', 3.5, '', '', 0),
      new CourseItem('westmalle dubbel', 3.5, '', '', 0),
      new CourseItem('westmalle trippel', 3.5, '', '', 0),
      new CourseItem('mannenliefde', 3.5, '', '', 0),
      new CourseItem('mooie nel', 3.5, '', '', 0),
    ]),
    new Course('wijn', [
      new CourseItem('wit (pinot grigio)', 10, '', '', 0),
      new CourseItem('rood (cabernet sangiovese)', 10, '', '', 0),
    ]),
    new Course('fris', [
      new CourseItem('coca cola', 2.5, '', '', 0),
      new CourseItem('coca cola light', 2.5, '', '', 0),
      new CourseItem('spa rood', 2.5, '', '', 0),
      new CourseItem('spa blauw', 2.5, '', '', 0),
      new CourseItem('spa groen', 2.5, '', '', 0),
      new CourseItem('fanta', 2.5, '', '', 0),
      new CourseItem('cassis', 2.5, '', '', 0),
      new CourseItem('chocomel', 2.5, '', '', 0),
      new CourseItem('fristi', 2.5, '', '', 0),
      new CourseItem('ginger ale', 2.5, '', '', 0),
      new CourseItem('tonic', 2.5, '', '', 0),
      new CourseItem('bitter lemon', 2.5, '', '', 0),
    ]),
  ]);

  

  getMenu(companyName) {
    return this.cenc;
  }
  getCourseList(companyName) {
    // called by sidenav.component.ts
    let courseList: string[] = [];
    this.cenc.courses.forEach(course => {
      courseList.push(course.courseName);
    });
    return courseList;
  }
  
}

