import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {
  userForm: FormGroup;
  
  constructor(private _fb: FormBuilder, private _http: HttpClient, private _router: Router) {
    this.userForm = this._fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.pattern('[^ @]*@[^ @]*')]],
      gender: ['', [Validators.required]]
    });
  }

  ngOnInit() {
  }

  saveUser() {
    this._http.post('http://localhost:2210/saveusers', this.userForm.value).subscribe((data: any) => {
      if (data.success) {
        this._router.navigate(['/login']);
      } else {
        alert('This username already exists! Please find a new one :)');
      }
    });

  }
}
