import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TaskService } from './task.service';
import { Task } from '../models/task';
import { User } from '../models/user';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  userId: number;
  taskForm: FormGroup;
  taskToUpdate: Task;
  taskList: Task[];

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute) {
    this.taskForm = this.fb.group({
      description: ['', Validators.required],
      state: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.userId = this.route.snapshot.params['id'];
    this.loadTasks()
    this.taskToUpdate = null;
  }

  loadTasks(){
    this.taskService.getTasksByTaskId(this.userId)
    .subscribe(data => {
      this.taskList = data;
    }, error => console.log(error));
  }

  updateTask(task){
    this.taskToUpdate = task;
    this.taskForm.patchValue( this.taskToUpdate);
  }

  save() {
    if (this.taskForm.valid) {
      let taskToSave = new Task();
      taskToSave = this.taskForm.getRawValue();
      taskToSave.user = new User();
      taskToSave.user.id = this.userId;
       if(this.taskToUpdate){

          this.taskService.updateTask(this.taskToUpdate.id, taskToSave).subscribe((update) => {
            if (update) {
              this.toastr.success('Task updated successfully');
              this.taskForm.reset();
              this.taskToUpdate = null;
            }
          })
         } else {
     
        this.taskService.createTask(taskToSave).subscribe(result => {
            if (result) {
              this.toastr.success('Task created successfully');
              this.taskForm.reset();
            }
        })
     }
     this.loadTasks();
  }
  }



}
