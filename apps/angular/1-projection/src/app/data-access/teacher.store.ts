import { Injectable, WritableSignal, signal } from '@angular/core';
import { Teacher } from '../model/teacher.model';

@Injectable({
  providedIn: 'root',
})
export class TeacherStore {
  teachers: WritableSignal<Teacher[]> = signal([]);

  addAll(teachers: Teacher[]) {
    this.teachers.set(teachers);
  }

  addOne(teacher: Teacher) {
    this.teachers.set([...this.teachers(), teacher]);
  }

  deleteOne(id: number) {
    this.teachers.set(this.teachers().filter((t) => t.id !== id));
  }
}
