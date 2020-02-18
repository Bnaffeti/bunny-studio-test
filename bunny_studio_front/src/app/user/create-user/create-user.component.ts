import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router) {
    this.userForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  save() {
    if (this.userForm.valid) {
      this.userService.createUser(this.userForm.getRawValue()).subscribe(data => {
        this.toastr.success('User created');
      },
        error => this.toastr.error('Oops! an error has occurred'));

      this.userForm.reset();
      this.router.navigate(['/users']);
    }
  }

}
