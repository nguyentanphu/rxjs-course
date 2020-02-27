import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Course } from "../model/course";
import { createHttpObservable } from "./util";
import { map } from "rxjs/operators";
import { fromPromise } from 'rxjs/internal-compatibility';

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

  selectCourseById(courseId: number) {
    return this.courses$
      .pipe(
        map(courses => courses.find(c => c.id === courseId))
      );
  }

  saveCourse(courseId: number, changes) {
    const courses = this.subject.getValue();

    const index = courses.findIndex(c => c.id === courseId);

    const newCourses = [...courses];

    newCourses[index] = {
      ...courses[index],
      ...changes
    };
    this.subject.next(newCourses);

    return fromPromise(fetch(`/api/courses/${courseId}`, {
      method: 'PUT',
      body: JSON.stringify(changes),
      headers: {
        'content-type': 'application/json'
      }
    }));
  }
  
}
