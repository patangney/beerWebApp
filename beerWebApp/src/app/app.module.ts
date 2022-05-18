import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { NavComponent } from './nav/nav.component';
import { LengthPipe } from './length.pipe';
import { PostListComponent } from './posts/post-list/post-list.component';
import { ViewPostComponent } from './posts/view-post/view-post.component';

@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    NavComponent,
    PostListComponent,
    ViewPostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
