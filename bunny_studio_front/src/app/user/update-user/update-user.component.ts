import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from 'src/app/models/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  id: number;
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute) {
    this.userForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.userService.getUser(this.id)
      .subscribe(data => {
        this.userForm.patchValue(data);
      }, error => console.log(error));
  }

  update() {
    if (this.userForm.valid) {
      this.userService.updateUser(this.id, this.userForm.getRawValue()).subscribe(data => {
        this.toastr.success('User updated');
      },
        error => this.toastr.error('Oops! an error has occurred'));

      this.userForm.reset();
      this.router.navigate(['/users']);
    }
  }

}