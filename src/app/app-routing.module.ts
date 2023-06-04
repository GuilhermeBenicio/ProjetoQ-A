import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginUserComponent } from './login-user/login-user.component';
import { HomeComponent } from './home/home.component';
import { CadastroUserComponent } from './cadastro-user/cadastro-user.component';
import { PostComentariosComponent } from './post-comentarios/post-comentarios.component';
import { PostagensGeraisComponent } from './postagens-gerais/postagens-gerais.component';

const routes: Routes = [
  { path: '', component: LoginUserComponent },
  { path: 'home', component: HomeComponent },
  { path: 'cadastro', component: CadastroUserComponent },
  { path: 'comentarios/:id', component: PostComentariosComponent },
  { path: 'postagens-gerais', component: PostagensGeraisComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
