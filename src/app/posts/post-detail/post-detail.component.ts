import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  currentPostId: any;
  currentUser: any;
  post: any = [];
  content: any;

  constructor(private _activeRoute: ActivatedRoute, private _router: Router, private _postService: PostsService) { }

  ngOnInit() {
    this._activeRoute.params.subscribe((data: any) => {
      this.currentPostId = data.post_id;
    });
    this._postService.getUser();
    this._postService.getPost();
    this._postService.$administrator.subscribe((data: any) => {
      this.currentUser = data.username;
    });
    this._postService.$post.subscribe((data:any) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i]._id === this.currentPostId) {
          this.post = data[i];
        }
      }
    });
  }

  backToList() {
    this._router.navigate(['/list-posts']);
  }

  addComment() {
    const comment = {
      post_id: this.post._id,
      content: this.content,
      author: this.currentUser
    };
    console.log(comment);
    this._postService.addComment(comment);
    this.content = '';
  }
}
