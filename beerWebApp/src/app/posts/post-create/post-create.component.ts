import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";

import { PostsService } from "../posts.service";

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.scss"]
})
export class PostCreateComponent {
  enteredTitle = "";
  enteredContent = "";

  constructor(public postsService: PostsService) { }

  onAddPost(form: NgForm) {
    // if (form.invalid) {
    //   return;
    // }
    this.postsService.addPost(form.value.id,form.value.beerTitle, form.value.tagline, form.value.firstBrewed, form.value.abv, form.value.imageUrl, form.value.description, form.value.brewersTips);
    form.resetForm();
  }
}
