import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[];

  constructor(private userService: UserService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.userService.getUsersList().subscribe(res => {
      this.users = res;
    });
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id)
      .subscribe(
        data => {
          this.reloadData();
          this.toastr.success('User deleted');
        },
        error => this.toastr.error('Oops! an error has occurred'));
  }

  updateUser(id: number) {
    this.router.navigate(['update', id]);
  }

  tasks(id: number) {
    this.router.navigate(['tasks', id]);
  }
}