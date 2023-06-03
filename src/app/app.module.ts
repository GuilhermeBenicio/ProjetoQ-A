import { AuthService } from './login-user/auth.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { HomeComponent } from './home/home.component';
import { CadastroUserComponent } from './cadastro-user/cadastro-user.component';
import { PostComentariosComponent } from './post-comentarios/post-comentarios.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginUserComponent,
    HomeComponent,
    CadastroUserComponent,
    PostComentariosComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
