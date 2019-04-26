import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { PanelBoxComponent } from './misc/panel-box/panel-box.component';
import { NavbarComponent } from './misc/navbar/navbar.component';
import { ReactiveComponent } from './validation/reactive/reactive.component';
import { HomeComponent } from './misc/home/home.component';
import { CreatePostComponent } from './posts/create-post/create-post.component';
import { ListPostsComponent } from './posts/list-posts/list-posts.component';

import { PostsService } from './posts/posts.service';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { PostDetailComponent } from './posts/post-detail/post-detail.component';
import { EditPostComponent } from './posts/edit-post/edit-post.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PanelBoxComponent,
    NavbarComponent,
    ReactiveComponent,
    HomeComponent,
    CreatePostComponent,
    ListPostsComponent,
    PostDetailComponent,
    EditPostComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [PostsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
