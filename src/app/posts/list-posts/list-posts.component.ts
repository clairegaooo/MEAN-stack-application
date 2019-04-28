import {Component, OnDestroy, OnInit} from '@angular/core';
import { PostsService } from '../posts.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.css']
})
export class ListPostsComponent implements OnInit, OnDestroy {
  cancelSubscription: any;
  posts: any = [];
  showUsers: any = [];
  showComments: any =[];
  comments: any = [];

  content: any = [];
  currentUser: any;
  constructor(private _postService: PostsService, private _router: Router) { }

  ngOnInit() {
    this._postService.getPost();
    this._postService.getUser();
    this._postService.$administrator.subscribe((data: any) => {
      this.currentUser = data.username;
    });
    this.cancelSubscription = this._postService.$post.subscribe((data: any) => {
      this.posts = data;
      this.showUsers = new Array(this.posts.length).fill(false);
      this.showComments = new Array(this.posts.length).fill(false);
      this.comments = new Array(this.posts.length).fill({});
    });
  }

  thumbsUp(index) {
    this._postService.saveLikes(this.posts[index]._id); // 为什么无法直接send点赞数？
  }
  delete(index) {
    if (this.currentUser === this.posts[index].createdBy) {
      this._postService.deletePost(this.posts[index]._id);
    } else {
      alert(`This post is created by ${this.posts[index].createdBy}, you have no rights to delete it!`);
    }

  }

  addComment(index) {
    const comment = {
      post_id: this.posts[index]._id,
      content: this.content[index],
      author: this.currentUser
    };
    this._postService.addComment(comment);
    this.content = '';
  }

  ngOnDestroy() {
    this.cancelSubscription.unsubscribe();
  }

  edit(index: number) {
    if (this.currentUser === this.posts[index].createdBy) {
      this._router.navigate(['/edit-post', this.posts[index]._id]);
    } else {
      alert(`This post is created by ${this.posts[index].createdBy}, you have no rights to edit it!`);
    }
  }
}
