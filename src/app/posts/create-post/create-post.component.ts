import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostsService } from '../posts.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  postForm: FormGroup;
  title: any;
  description: any;
  constructor(private _fb: FormBuilder, private _postService: PostsService, private _router: Router, private _authService: AuthService) {
    this.postForm = this._fb.group({
      title: ['', Validators.required],
      description: [''],
    });
  }

  ngOnInit() {
  }

  savePost() {
    const newPost = {
      title: this.title,
      description: this.description,
    };
    console.log(newPost);
    this._postService.savePost(newPost);
    this._router.navigate(['/list-posts']);
  }
}
