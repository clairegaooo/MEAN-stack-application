import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../posts/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: any;

  constructor(private _postService: PostsService) { }

  ngOnInit() {
    this._postService.getUser();
    this._postService.$administrator.subscribe((data: any) => {
      this.currentUser = data.username;
    });
  }

}
