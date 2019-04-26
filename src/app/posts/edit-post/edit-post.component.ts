import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { PostsService } from '../posts.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  postForm: FormGroup;
  currentPostId: any;
  currentPost: any;

  constructor(private _fb: FormBuilder, private _postService: PostsService, private _activeRoute: ActivatedRoute, private _router: Router) {}

  ngOnInit() {
    this._activeRoute.params.subscribe((data: any) => {
      this.currentPostId = data.post_id;
      console.log(this.currentPostId);
    });
    this._postService.getPost();
    this._postService.$post.subscribe((data: any) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i]._id === this.currentPostId) {
          this.currentPost = data[i];
        }
      }
      this.postForm = new FormGroup({
        title: new FormControl(this.currentPost.title, [Validators.required]),
        description: new FormControl(this.currentPost.description)
      });
    });
  }

  updatePost() {
    const updatePost = {
      id: this.currentPostId,
      title: this.postForm.value.title,
      description: this.postForm.value.description
    };
    this._postService.updatePost(updatePost);
    this._router.navigate(['/list-posts']);
  }
}
