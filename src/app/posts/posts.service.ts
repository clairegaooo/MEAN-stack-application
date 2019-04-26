import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  $administrator = new Subject();
  $post =  new Subject();

  constructor(private _http: HttpClient) { }
  savePost(credentials) {
    this._http.post('http://localhost:2210/saveposts', credentials)
      .subscribe((data: any) => {
        if (data.success) {
          alert('You have successfully posted!');
        }
      });
  }
  getPost() {
    this._http.get('http://localhost:2210/getposts').subscribe((data: any) => {
      this.$post.next(data);
    });
  }
  getUser() {
    this._http.get('http://localhost:2210/administrator').subscribe((data: any) => {
      this.$administrator.next(data);
    });
  }
  saveLikes(postID) {
    this._http.post('http://localhost:2210/savelikes', {postID})
      .subscribe((data: any) => {
        if (data.success) {
          this.getPost();
        }
      });
  }

  deletePost(postID) {
    this._http.post('http://localhost:2210/delete', {postID})
      .subscribe((data: any) => {
        if (data.success) {
          this.getPost();
        }
      });
  }

  addComment(commentData) {
    this._http.post('http://localhost:2210/addcomment', commentData)
      .subscribe((data: any) => {
        if (data.success) {
          this.getPost();
          alert('You have sumbit your comment successfully :)');
        }
      });
  }

  updatePost(credentials) {
    this._http.post('http://localhost:2210/updatepost', credentials)
      .subscribe((data: any) => {
        if (data.success) {
          this.getPost();
        }
      });
  }
}
