import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../login-user/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  title = 'projeto_BD';
  profileImageUrl: string = '';
  personName: string = '';
  personAge: number = 0;
  personPhone: string = '';
  personEmail: string = '';
  errorMsg: string = '';
  postTxt: string = '';
  replyTxt: string[] = [];
  isToEdit: Boolean = false;
  EditPostTxt: string = '';

  public pergunta: string = '';
  public posts: any = [];

  constructor(
    private http: HttpClient,
    private authservice: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const dadosUsuario = this.authservice.getUserInfo();
    let id = '';
    for (const [key, item] of Object.entries(dadosUsuario)) {
      this.personName = item.usuario;
      this.personAge = item.idade;
      this.personPhone = item.telefone;
      this.personEmail = item.email;
      this.profileImageUrl = item.urlImg;
    }

    this.getUserPosts();
  }

  ngOnChange(): void {
    const dadosUsuario = this.authservice.getUserInfo();
    let id = '';
    for (const [key, item] of Object.entries(dadosUsuario)) {
      this.personName = item.usuario;
      this.personAge = item.idade;
      this.personPhone = item.telefone;
      this.personEmail = item.email;
      this.profileImageUrl = item.urlImg;
    }

    this.getUserPosts();
  }

  getUserPosts() {
    const dadosUsuario = this.authservice.getUserInfo();
    let id = '';
    this.posts = [];

    for (const [key, item] of Object.entries(dadosUsuario)) {
      id = item._id;
    }

    this.http
      .get(`http://localhost:3000/post/list/${id}`)
      .subscribe((data: any) => {
        for (const [key, item] of Object.entries(data)) {
          this.posts[key] = item;
        }
      });

    setTimeout(() => {
      if (this.posts.length == 0) {
        this.errorMsg = 'Você ainda não possui posts.';
      } else {
        this.errorMsg = '';
      }
    }, 200);
  }

  deletePost(postId: string) {
    const dadosUsuario = this.authservice.getUserInfo();
    let userId;

    for (const [key, item] of Object.entries(dadosUsuario)) {
      userId = item._id;
    }

    this.http
      .delete(`http://localhost:3000/post/delete/posts/${postId}`, {
        body: {
          _userId: userId,
        },
      })
      .subscribe((data: any) => {
        this.getUserPosts();
      });
  }

  createPost() {
    const dadosUsuario = this.authservice.getUserInfo();
    let userId;

    for (const [key, item] of Object.entries(dadosUsuario)) {
      userId = item._id;
    }

    let body = {
      pergunta: this.postTxt,
      tags: [],
    };

    this.http
      .post(
        `http://localhost:3000/post/create/${userId}`,
        JSON.parse(JSON.stringify(body))
      )
      .subscribe((data: any) => {
        this.postTxt = '';
        this.getUserPosts();
      });
  }

  formatDate(dataString: string) {
    const data = new Date(dataString);
    const dia = data.getDate();
    const mes = data.getMonth() + 1;
    const ano = data.getFullYear();
    const dataFormatada = `${dia.toString().padStart(2, '0')}/${mes
      .toString()
      .padStart(2, '0')}/${ano}`;

    return dataFormatada;
  }

  createReply(postId: string, index: number) {
    const dadosUsuario = this.authservice.getUserInfo();
    let userId;
    let userName;

    for (const [key, item] of Object.entries(dadosUsuario)) {
      userId = item._id;
      userName = item.usuario;
    }

    let body = {
      usuario: userName,
      respostaTexto: this.replyTxt[index],
    };

    this.http
      .post(
        `http://localhost:3000/reply/create/${postId}`,
        JSON.parse(JSON.stringify(body))
      )
      .subscribe((data: any) => {
        this.replyTxt[index] = '';
        this.getUserPosts();
      });
  }

  setIsToEdit(postId: string) {
    this.posts.forEach((element: any, index: any) => {
      if (element._id == postId && element.isToEdit == false) {
        this.posts[index]['isToEdit'] = true;
      } else {
        this.posts[index]['isToEdit'] = false;
      }
    });
    console.log(this.posts);
  }

  setIsToCancel(postId: string) {
    this.posts.forEach((element: any, index: any) => {
      if (element._id == postId) {
        this.posts[index]['isToEdit'] = false;
      }
    });
    console.log(this.posts);
  }

  editPost(postId: string) {
    let body = {
      pergunta: this.EditPostTxt,
    };

    this.http
      .put(
        `http://localhost:3000/post/update/posts/${postId}`,
        JSON.parse(JSON.stringify(body))
      )
      .subscribe((data: any) => {
        console.log(data);
        this.EditPostTxt = '';
        this.getUserPosts();
        this.setIsToEdit(postId);
      });
  }
}
