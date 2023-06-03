import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginUserComponent } from './login-user/login-user.component';
import { HomeComponent } from './home/home.component';
import { CadastroUserComponent } from './cadastro-user/cadastro-user.component';
import { PostComentariosComponent } from './post-comentarios/post-comentarios.component';

const routes: Routes = [
  { path: '', component: LoginUserComponent },
  { path: 'home', component: HomeComponent },
  { path: 'cadastro', component: CadastroUserComponent },
  { path: 'comentarios/:id', component: PostComentariosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
