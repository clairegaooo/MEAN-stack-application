import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

import { LoginComponent } from './auth/login/login.component';
import { ReactiveComponent } from './validation/reactive/reactive.component';
import { HomeComponent } from './misc/home/home.component';
import { CreatePostComponent } from './posts/create-post/create-post.component';
import { ListPostsComponent } from './posts/list-posts/list-posts.component';
import { PostDetailComponent } from './posts/post-detail/post-detail.component';
import { EditPostComponent } from './posts/edit-post/edit-post.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'registration', component: ReactiveComponent},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'create-post', component: CreatePostComponent, canActivate: [AuthGuard] },
  { path: 'list-posts', component: ListPostsComponent, canActivate: [AuthGuard] },
  { path: 'list-posts/:post_id', component: PostDetailComponent, canActivate: [AuthGuard] },
  { path: 'edit-post/:post_id', component: EditPostComponent, canActivate: [AuthGuard]},
  { path : '', redirectTo: 'home', pathMatch: 'full'},
  { path : '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
