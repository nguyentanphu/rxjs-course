import { Component, OnInit } from '@angular/core';
import { interval, merge, Subject, BehaviorSubject, AsyncSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CoursesStore } from './common/courses.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private coursesStore: CoursesStore) {}
  title = 'app';
  ngOnInit(): void {
    this.coursesStore.init();
  }
}
