import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Usuario } from './usuario';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css'],
})
export class LoginUserComponent implements OnInit {
  public usuario: Usuario = new Usuario();
  public usuarioBanco: Usuario = new Usuario();

  constructor(private authService: AuthService, private http: HttpClient) {}

  ngOnInit() {}

  fazerLogin() {
    this.http.get(`http://localhost:3000/user/${this.usuario.nome}`).subscribe(
      (data: any) => {
        this.usuarioBanco.nome = data[0].usuario;
        this.usuarioBanco.senha = data[0].senha;
        // console.log(this.usuarioBanco);
        this.authService.fazerLogin(this.usuario, this.usuarioBanco, data);
      },
      (err) => {
        // erro na tela
        console.log('erro');
      }
    );
    // this.authService.fazerLogin(this.usuario);
  }
}
