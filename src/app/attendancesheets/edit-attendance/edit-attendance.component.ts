import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IGroup, IMember, IAttendanceSheet, AttendanceSheetService } from 'app/common/models';
import { AttendanceFormComponent } from 'app/attendancesheets/shared';

@Component({
  templateUrl: './edit-attendance.component.html',
  styleUrls: ['./edit-attendance.component.css']
})
export class EditAttendanceComponent implements OnInit {
  group: IGroup;
  originalSheet: IAttendanceSheet;
  trainers: IMember[];

  @ViewChild(AttendanceFormComponent) form: AttendanceFormComponent;

  constructor(
    private route: ActivatedRoute,
    private sheetService: AttendanceSheetService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.data.forEach(data => {
      this.trainers = data['trainers'];
      this.originalSheet = data['sheet'];
    });

    this.group = this.originalSheet.group;
  }

  editSheet() {
    if (!this.form.isValid()) {
      return;
    }

    let values = this.form.values();

    if (values) {
      this.originalSheet.attendees = values.attendees;
      this.originalSheet.trainers = values.trainers;
      this.originalSheet.date = values.date;

      this.sheetService.updateSheet(this.originalSheet);
    }

    this.router.navigate(['groups', this.group.id]);
  }

  handleBackAction() {
    this.router.navigate(['groups', this.group.id]);
  }

}
