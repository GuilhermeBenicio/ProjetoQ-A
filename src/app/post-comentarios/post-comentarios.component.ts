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
  /* postContent: PostQuestion = {
    pergunta: '',
    respostas: [],
    tags: [],
    criadoEm: new Date(),
    atualizadoEm: new Date(),
  }; */
  postContent: any = [];
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

  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe((params) => {
      this.postID = params.get('id') || '';
    });
    this.postContent = [];
    await this.setPostContent(this.postID);
    this.getResposta();
    console.log('============');
    console.log(this.respostas);
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

          this.getUserAnswerInfo(this.respostas[key].usuario)
            .then((userResponse: any) => {
              this.respostas[key]['imgUserAnswer'] = userResponse.urlImg;
              this.respostas[key]['criadoEm'] = this.formatDate(
                this.respostas[key]['criadoEm'].toString()
              );
            })
            .catch((error: any) => {
              console.error(error);
            });
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

  async setPostContent(idPost: string): Promise<void> {
    try {
      const post = await this.authservice.getOtherUserInfoByPost(idPost);
      this.postContent = {
        _id: post._id,
        usuario: post.usuario,
        urlImg: post.urlImg,
        posts: post.posts[0],
      };
    } catch (error) {
      console.error(error);
    }
  }

  getUserAnswerInfo(username: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(`http://localhost:3000/user/${username}`).subscribe(
        (data: any) => {
          for (const [key, item] of Object.entries(data)) {
            resolve(item);
          }
        },
        (error: any) => {
          reject(error);
        }
      );
    });
  }

  deleteReply(replyId: string) {
    this.http
      .delete(`http://localhost:3000/reply/delete/${replyId}`)
      .subscribe((data: any) => {
        this.getResposta();
      });
  }
}
