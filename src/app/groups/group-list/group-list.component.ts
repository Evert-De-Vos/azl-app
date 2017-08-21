import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { IGroup, GroupService } from 'app/common/models/index';


@Component({
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {
  groupForm: FormGroup;
  groupName: FormControl;

  groups: IGroup[];
  shownGroups: IGroup[];
  searchActive: boolean = false;
  searchTerm: string;
  editMode: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private groupService: GroupService,
    private router: Router) { }

  ngOnInit() {
    this.route.data.forEach((data) => {
      this.groups = data['groups'];
      this.shownGroups = this.groups;
    });

    this.groupName = new FormControl('', Validators.required)
    this.groupForm = new FormGroup({
      groupName: this.groupName
    })

  }

  handleMainAction() {
    if (this.editMode) {
      this.editMode = false;

    } else {
      this.editMode = true;
    }
  }

  addGroup(values: any) {
    let existingGroup = this.groups.find(g => g.name === values.groupName);
    if (!existingGroup && this.groupForm.valid) {
      this.groupService
        .addGroup(values.groupName)
        .subscribe(g => {
          this.groups.push(g);
          this.shownGroups = this.groups;
        });
    } else {
      //group exists
    }

    this.groupForm.reset();
  }

  removeGroup(id: string) {
    this.groupService.removeGroup(id)
    this.groups = this.groups.filter(group => group.id != id);
    this.shownGroups = this.groups;
  }

  toggleSearch() {
    this.searchActive = !this.searchActive;
    this.searchTerm = undefined;
    this.shownGroups = this.groups;

  }

  filterGroups() {
    this.shownGroups = this.groups.filter(group => group.name.includes(this.searchTerm));
  }
}
