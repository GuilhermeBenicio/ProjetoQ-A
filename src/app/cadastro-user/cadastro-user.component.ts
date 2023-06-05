import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-user',
  templateUrl: './cadastro-user.component.html',
  styleUrls: ['./cadastro-user.component.css'],
})
export class CadastroUserComponent {
  public user: String = '';
  public senha: String = '';
  public email: String = '';
  public idade: number = 0;
  public telefone: String = '';
  public profileImageUrl: String = '';

  constructor(private http: HttpClient, private router: Router) {}
  public retornoApi: any = [];

  enviarCadastro() {
    try {
      this.http
        .get('https://dog.ceo/api/breeds/image/random')
        .subscribe((data: any) => {
          const img = data.message;

          this.http
            .post(`http://localhost:3000/user/register`, {
              usuario: this.user,
              senha: this.senha,
              urlImg: img,
              email: this.email,
              idade: this.idade,
              telefone: this.telefone,
            })
            .subscribe(
              (data: any) => {
                this.retornoApi = [];
                this.retornoApi[0] = {
                  message: data.message,
                  class: 'resposta success',
                };
                this.router.navigateByUrl('/');
              },
              (err: any) => {
                this.retornoApi = [];
                this.retornoApi[0] = {
                  message: err.error.message,
                  class: 'resposta error',
                };
              }
            );
        });
    } catch (e) {
      console.log('Deu ruim');
    }
  }
}
