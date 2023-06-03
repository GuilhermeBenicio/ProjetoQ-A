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
    for (const [key, item] of Object.entries(dadosUsuario)) {
      id = item._id;
    }
    // let temp = Array.from(id)
    console.log(id);

    this.http
      .get(`http://localhost:3000/post/list/${id}`)
      .subscribe((data: any) => {
        for (const [key, item] of Object.entries(data)) {
          this.posts[key] = item;
        }
      });
  }
}
