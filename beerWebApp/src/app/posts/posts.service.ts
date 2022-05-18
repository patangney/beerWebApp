import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse  } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs'; //eventemitter
import { map } from 'rxjs/operators';

import { Post } from './post.model';




@Injectable({ providedIn: 'root' })
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();
  REST_API: string = 'http://localhost:3000/api';



  constructor(private httpClient: HttpClient) { }

  // Get All Posts
  getPosts() {
    this.httpClient.get<{ message: string, posts: any }>(this.REST_API + '/posts')
      .pipe(map((postData) => {
        //return array of posts | replace post with a new js object | need to change id
        return postData.posts.map(post => {
          return {
            id: post._id,
            beerTitle: post.beerTitle,
            tagline: post.tagline,
            firstBrewed: post.firstBrewed,
            abv: post.abv,
            imageUrl: post.imageUrl,
            description: post.description,
            brewersTips: post.brewersTips,
          };
        });

      }))
      .subscribe((transformedMapOperation) => {
        this.posts = transformedMapOperation;
        this.postsUpdated.next([...this.posts]);
      });
  }

  //Get Single Post
  getPost(id: string) {
    //return a clone of the object we are getting
    return {
      ...this.posts.find(p => p.id === id)
    };
  }

 // Get Random Post
  getRandomPost() {
    let API_URL = `${this.REST_API}/posts/random/`;
    this.httpClient.get<{ message: string, posts: any }>(API_URL)
    .subscribe((data) => {
      console.log(data.posts); //post object

    }) //TODO - come back to this adf
  }


  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(id: string, beerTitle: string, tagline: string, firstBrewed: string, abv: string, imageUrl: string, brewersTips: string, description: string) {
    const post: Post = {
      id: null,
      beerTitle: beerTitle,
      tagline: tagline,
      firstBrewed: firstBrewed,
      abv: abv,
      imageUrl: imageUrl,
      description: description,
      brewersTips: brewersTips,
    };
    //store on server - optimistic updating | update async until we get a response 200 | extracting ID postId: createPost._id
    this.httpClient.post<{ message: string, postId: string }>(this.REST_API + '/posts', post)
      .subscribe((dataResponse) => {
        console.log(dataResponse.message);
        const id = dataResponse.postId;
        post.id = id; // Only overwriting one value - not entire object
        this.posts.push(post); // push to local posts
        this.postsUpdated.next([...this.posts]);
      });

  }

  // Error
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = error.error.message;
    } else {
      // Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
