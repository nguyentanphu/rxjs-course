import { Component, OnInit } from '@angular/core';
import { Course } from "../model/course";
import { interval, Observable, of, timer, throwError } from 'rxjs';
import { catchError, delayWhen, map, retryWhen, shareReplay, tap, delay, take, concat } from 'rxjs/operators';
import { createHttpObservable } from '../common/util';
import { debug, DebugLoggingLevel } from '../common/debug.operator';
import { CoursesStore } from '../common/courses.store';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  beginner$: Observable<Course[]>;
  advanced$: Observable<Course[]>;

  constructor(private coursesStore: CoursesStore) {

  }

  ngOnInit() {
    this.beginner$ = this.coursesStore.selectBeginnerCourses();
    this.advanced$ = this.coursesStore.selectAdvancedCourses();


  }

}
