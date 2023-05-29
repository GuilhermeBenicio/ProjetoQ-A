import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usuarioAutenticado: boolean = false;
  private userInfo: Object = {};

  constructor(private router: Router) {}

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
}
