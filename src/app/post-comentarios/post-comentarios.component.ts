import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../login-user/auth.service';
import { ActivatedRoute } from '@angular/router';
import { PostQuestion, User } from './dto.api';

@Component({
  selector: 'app-post-comentarios',
  templateUrl: './post-comentarios.component.html',
  styleUrls: ['./post-comentarios.component.css'],
})
export class PostComentariosComponent {
  title = 'projeto_BD';
  profileImageUrl: string = '';
  personName: string = '';
  personAge: number = 0;
  personPhone: string = '';
  personEmail: string = '';
  postID: string = '';
  postContent: PostQuestion = {
    pergunta: '',
    respostas: [],
    tags: [],
    criadoEm: new Date(),
    atualizadoEm: new Date(),
  };
  errorMsg: string = '';
  userResponse: User = {
    usuario: '',
    senha: '',
    urlImg: '',
    email: '',
    idade: 0,
    telefone: '',
    posts: [],
    criadoEm: new Date(),
  };

  public pergunta: string = '';
  public respostas: any = [];

  constructor(
    private http: HttpClient,
    private authservice: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.postID = params.get('id') || ''; // 'id' é o nome do parâmetro na URL
    });

    const dadosUsuario = this.authservice.getUserInfo();
    let id = '';
    for (const [key, item] of Object.entries(dadosUsuario)) {
      this.personName = item.usuario;
      this.profileImageUrl = item.urlImg;

      for (let i = 0; i < item.posts.length; i++) {
        if (item.posts[i]._id === this.postID) {
          this.postContent = item.posts[i];
        }
      }
    }
    this.getResposta();
  }

  getResposta() {
    this.respostas = [];
    this.http
      .get(`http://localhost:3000/reply/list/${this.postID}`)
      .subscribe((data: any) => {
        if (data.length == 0) {
          this.errorMsg = 'Não há respostas nesta publicação.';
        } else {
          this.errorMsg = '';
        }

        for (const [key, item] of Object.entries(data)) {
          this.respostas[key] = item;
          setTimeout(() => {
            this.respostas[key]['imgUserAnswer'] = this.userResponse.urlImg;
            console.log(this.respostas);
          }, 200);

          this.getUserAnswerInfo(this.respostas[key].usuario);

          this.respostas[key]['criadoEm'] = this.formatDate(
            this.respostas[key]['criadoEm'].toString()
          );
        }
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

  getUserAnswerInfo(username: string) {
    let userResponse: any;
    this.http
      .get(`http://localhost:3000/user/${username}`)
      .subscribe((data: any) => {
        for (const [key, item] of Object.entries(data)) {
          userResponse = item;
        }
      });
    setTimeout(() => {
      this.userResponse = userResponse;
    }, 200);
  }

  deleteReply(replyId: string) {
    this.http
      .delete(`http://localhost:3000/reply/delete/${replyId}`)
      .subscribe((data: any) => {
        this.getResposta();
      });
  }
}
