import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


import { IMember, IAttendanceSheet } from 'app/common/models';

@Component({
  selector: 'attendance-form',
  templateUrl: './attendance-form.component.html',
  styleUrls: ['./attendance-form.component.css']
})
export class AttendanceFormComponent implements OnInit {
  form: FormGroup;
  date: FormControl;

  @Input() trainers: IMember[];
  @Input() members: IMember[];

  @Input() sheet: IAttendanceSheet;

  chosenTrainers: IMember[] = [];
  attendees: IMember[] = [];

  selecting: boolean = false;
  hasChanges: boolean = false;

  constructor() { }

  ngOnInit() {
    if (this.sheet) {
      this.attendees = this.sheet.attendees;
      this.sheet.trainers.forEach((trainer: IMember) => {
        this.addTrainer(trainer);
      });
      this.date = new FormControl(new Date(this.sheet.date));
    }

    if (!this.date) {
      this.date = new FormControl(new Date());
    }

    this.form = new FormGroup({
      formDate: this.date
    });

    this.hasChanges = false;

  }

  isValid() {
    let flag = true;

    if (!this.date.valid) {
      this.date.markAsDirty();
      flag = false;
    }

    if (this.chosenTrainers.length === 0) {

      flag = false;
    }

    return flag;
  }

  values(): any {

    if (this.hasChanges) {
      return {
        date: this.date.value,
        attendees: this.attendees,
        trainers: this.chosenTrainers
      }
    }
  }

  addTrainer(trainer: IMember) {
    this.chosenTrainers.push(trainer);
    this.trainers = this.trainers.filter(t => t.id != trainer.id);

    if (this.trainers.length === 0) {
      this.selecting = false;
    }

    this.hasChanges = true;
  }

  removeTrainer(trainer: IMember) {
    this.trainers.push(trainer);
    this.chosenTrainers = this.chosenTrainers.filter(t => t.id !== trainer.id);

    this.hasChanges = true;
  }

  toggleSelecting() {
    this.selecting = !this.selecting;
  }

  toggleCheck(member: IMember) {
    if (!this.isChecked(member.id)) {
      this.attendees.push(member);
    } else {
      this.attendees = this.attendees.filter(item => item.id !== member.id);
    }

    this.hasChanges = true;
  }

  isChecked(id: string) {
    return this.attendees.findIndex(member => member.id === id) > -1 ? true : null;
  }
}

