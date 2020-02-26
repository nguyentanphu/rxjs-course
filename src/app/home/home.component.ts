import { Component, OnInit } from '@angular/core';
import { Course } from "../model/course";
import { interval, Observable, of, timer } from 'rxjs';
import { catchError, delayWhen, map, retryWhen, shareReplay, tap } from 'rxjs/operators';
import { createHttpObservable } from '../common/util';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  beginner$: Observable<Course[]>;
  advanced$: Observable<Course[]>;

  constructor() {

  }

  ngOnInit() {
    const courses$ = createHttpObservable('/api/courses')
      .pipe(
        map(response => response.payload as Course[]),
        shareReplay()
      );

    this.beginner$ = courses$
      .pipe(
        map(courses => courses.filter(c => c.category === 'BEGINNER'))
      );

    this.advanced$ = courses$
      .pipe(
        map(courses => courses.filter(c => c.category === 'ADVANCED'))
      );



  }

}
