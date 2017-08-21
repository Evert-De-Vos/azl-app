import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IGroup, IAttendanceSheet } from 'app/common/models';

@Component({
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.css']
})
export class GroupDetailsComponent implements OnInit {
  group: IGroup;
  attendanceSheets: IAttendanceSheet[];
  activePage: string = 'members';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {

  }

  ngOnInit() {
    this.route.data.forEach((data) => {
      this.group = data['group'];
      this.attendanceSheets = data['sheets'];
      this.attendanceSheets.sort(sortByDate);
    });
  }

  handleMainAction() {
    this.router.navigate(['groups', this.group.id, 'newsheet'])
  }

  handleBackAction() {
    this.router.navigate(['groups'])

  }

  setActivePage(str: string) {
    this.activePage = str;
  }
}

function sortByDate(d1, d2) {
  if (d1.date < d2.date) return 1;
  else if (d1.date === d2.date) return 0;
  else return -1;
}
