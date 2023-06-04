import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Usuario } from './usuario';
import { HttpClient } from '@angular/common/http';
import { PostQuestionUser, User } from '../post-comentarios/dto.api';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usuarioAutenticado: boolean = false;
  private userInfo: Object = {};
  private postInfo: PostQuestionUser = {
    _id: '',
    usuario: '',
    urlImg: '',
    posts: [],
  };

  constructor(private router: Router, private http: HttpClient) {}

  fazerLogin(userFromUser: Usuario, userFromDB: Usuario, userInfo: Object) {
    if (
      userFromUser.senha === userFromDB.senha &&
      userFromUser.nome === userFromDB.nome
    ) {
      this.usuarioAutenticado = true;
      this.userInfo = userInfo;

      this.router.navigate(['/home']);
    } else {
      this.usuarioAutenticado = false;
    }
  }

  getAutenticacao() {
    return this.usuarioAutenticado;
  }

  getUserInfo() {
    return this.userInfo;
  }

  getOtherUserInfoByPost(idPost: string): Promise<PostQuestionUser> {
    return new Promise((resolve, reject) => {
      this.http.get(`http://localhost:3000/post/list`).subscribe(
        (data: any) => {
          data.forEach((user: any) => {
            user.posts.forEach((post: any) => {
              if (post._id === idPost) {
                const postInfo = {
                  _id: user._id,
                  usuario: user.usuario,
                  urlImg: user.urlImg,
                  posts: [
                    {
                      pergunta: post.pergunta,
                      respostas: post.respostas,
                      tags: post.tags,
                      criadoEm: post.criadoEm,
                      atualizadoEm: post.atualizadoEm,
                      _id: post._id,
                    },
                  ],
                };
                resolve(postInfo); // Resolving the promise with the postInfo
              }
            });
          });
        },
        (error: any) => {
          reject(error); // Rejecting the promise in case of an error
        }
      );
    });
  }
}
