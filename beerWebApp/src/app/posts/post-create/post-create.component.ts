import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";

import { PostsService } from "../posts.service";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.scss"]
})
export class PostCreateComponent {
  enteredTitle = "";
  enteredContent = "";

  constructor(public postsService: PostsService, private router: ActivatedRoute) { }

  onAddPost(form: NgForm) {
    // if (form.invalid) { // TODO fix later - need to change form to reactive for controls - T
    //   return;
    // }
    this.postsService.addPost(form.value.id,form.value.beerTitle, form.value.tagline, form.value.firstBrewed, form.value.abv, form.value.imageUrl, form.value.description, form.value.brewersTips);
    form.resetForm();
  }
}
