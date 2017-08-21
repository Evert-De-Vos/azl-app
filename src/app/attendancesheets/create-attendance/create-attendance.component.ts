import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IGroup, IMember, IAttendanceSheet, AttendanceSheetService } from 'app/common/models';
import { AttendanceFormComponent } from 'app/attendancesheets/shared';

@Component({
  templateUrl: './create-attendance.component.html',
  styleUrls: ['./create-attendance.component.css']
})
export class CreateAttendanceComponent implements OnInit {
  group: IGroup;
  trainers: IMember[];

  @ViewChild(AttendanceFormComponent) form: AttendanceFormComponent;

  constructor(
    private route: ActivatedRoute,
    private sheetService: AttendanceSheetService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.data.forEach(data => {
      this.group = data['group'];
      this.trainers = data['trainers'];
    });
  }

  addSheet() {
    if (!this.form.isValid()) {
      return;
    }

    let input = this.form.values();

    let sheet: IAttendanceSheet = {
      group: this.group,
      date: input.date,
      trainers: input.trainers,
      attendees: input.attendees
    }

    this.sheetService.addSheet(sheet);

    this.router.navigate(['groups', this.group.id]);
  }

  handleBackAction() {
    this.router.navigate(['groups', this.group.id]);
  }
}
