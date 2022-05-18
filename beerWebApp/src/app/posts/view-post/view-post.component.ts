import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PostsService } from "../posts.service";
import { Post } from './../post.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.scss']
})
export class ViewPostComponent implements OnInit {
  private postId: string;
  public post: Post;
  public randomPost: Post;


  //add condition for edit or random mode
  private mode = 'view';

  constructor(public postsService: PostsService, public route: ActivatedRoute) { }

  ngOnInit() {
    //get post id param
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      console.log(paramMap);
      if (paramMap.has('id')) {
        console.log('pos 1');
        //pass in extracted id from url
        this.mode = 'view'; //TODO - add a edit function in view-post details & delete fn
        this.postId = paramMap.get('id');
        this.post = this.postsService.getPost(this.postId);
      }
      else {
        this.mode = 'random';
        console.log(this.mode);
        this.postsService.getRandomPost();
      }






      // else {
      //   console.log('pos 2');
      //   this.mode = 'normal';
      //   this.postId = null
      // }
    });
  }





}
