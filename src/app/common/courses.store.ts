import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Course } from "../model/course";
import { createHttpObservable } from "./util";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class CoursesStore {
  private subject = new BehaviorSubject<Course[]>([]);
  courses$ = this.subject.asObservable();

  init() {
    createHttpObservable("/api/courses")
      .pipe(map(response => response.payload as Course[]))
      .subscribe(courses => this.subject.next(courses));
  }

  selectBeginnerCourses() {
    return this.courses$.pipe(
      map(courses => courses.filter(c => c.category === "BEGINNER"))
    );
  }

  selectAdvancedCourses() {
    return this.courses$.pipe(
      map(courses => courses.filter(c => c.category === "ADVANCED"))
    );
  }
}
