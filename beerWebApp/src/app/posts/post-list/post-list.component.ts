import { Component, OnDestroy, OnInit } from '@angular/core';
import { DUMMY_DATA } from './dummyData';
import { PostsService } from './../posts.service';
import { Post } from '../post.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {

  // posts = [...DUMMY_DATA]; //copy dummy data for testing

  posts: Post[] = [];
  private postsSub: Subscription;
  // Store the service instance -
  //use dependency inject to use the service
  constructor(public postsService: PostsService) {}

  ngOnInit() {
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener()
    .subscribe((posts: Post[]) => {
      this.posts = posts;
    });
  }

  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
  }


}
