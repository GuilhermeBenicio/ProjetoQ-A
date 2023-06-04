import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../login-user/auth.service';
import { Router } from '@angular/router';
import { PostQuestion, User } from '../post-comentarios/dto.api';

@Component({
  selector: 'app-postagens-gerais',
  templateUrl: './postagens-gerais.component.html',
  styleUrls: ['./postagens-gerais.component.css'],
})
export class PostagensGeraisComponent {
  title = 'projeto_BD';
  profileImageUrl: string = '';
  personName: string = '';
  personAge: number = 0;
  personPhone: string = '';
  personEmail: string = '';
  errorMsg: string = '';
  postTxt: string = '';
  replyTxt: string = '';

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

    this.getUsersPosts();
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

    this.getUsersPosts();
  }

  getUsersPosts() {
    let arrayFormatted: any[] = [];

    this.http
      .get<any[]>('http://localhost:3000/post/list')
      .subscribe((data: any[]) => {
        for (const [key, item] of Object.entries(data)) {
          this.posts[key] = item;
        }
        setTimeout(() => {
          this.posts.forEach((element: any) => {
            element.posts.forEach((post: any) => {
              arrayFormatted.push({
                usuario: element.usuario,
                urlImg: element.urlImg,
                post: post,
                criadoEm: this.formatDate(post.criadoEm.toString()),
              });
            });
          });
          this.posts = arrayFormatted;
        }, 200);
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

  createReply(postId: string) {
    const dadosUsuario = this.authservice.getUserInfo();
    let userName;

    for (const [key, item] of Object.entries(dadosUsuario)) {
      userName = item.usuario;
      console.log(item);
    }

    let body = {
      usuario: userName,
      respostaTexto: this.replyTxt,
    };

    this.http
      .post(
        `http://localhost:3000/reply/create/${postId}`,
        JSON.parse(JSON.stringify(body))
      )
      .subscribe((data: any) => {
        this.replyTxt = '';
      });
  }
}
