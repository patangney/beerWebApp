import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

import { PostsService } from "../posts.service";
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from './../post.model';

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.scss"]
})
export class PostCreateComponent implements OnInit {
  enteredTitle = "";
  enteredContent = "";
  private mode = 'create'; //default
  private postId: string;
  post: Post; //store the post
  constructor(public postsService: PostsService, public router: ActivatedRoute) { }

  ngOnInit(): void {
    //observable that we can subscribe to as we need the URL for edit
    this.router.paramMap.subscribe((paramMap: ParamMap) => {
      //check for post id
      if (paramMap.has('id')) {
        this.mode = 'edit';
        this.postId = paramMap.get('id');
        this.post = this.postsService.getPost(this.postId); //id from extracted url

      } else {
        console.log(this.mode);
        this.mode = 'create';
        this.postId = null;
      }
    });

  }

  onAddPost(form: NgForm) {
    // if (form.invalid) { // TODO fix later - need to change form to reactive for controls - T
    //   return;
    // }
    this.postsService.addPost(form.value.id,form.value.beerTitle, form.value.tagline, form.value.firstBrewed, form.value.abv, form.value.imageUrl, form.value.description, form.value.brewersTips);
    form.resetForm();
  }


}
