export class User {
  usuario: string = '';
  senha: string = '';
  urlImg: string = '';
  email: string = '';
  idade: number = 0;
  telefone: string = '';
  posts?: PostQuestion[];
  criadoEm: Date = new Date();
}

export class Respostas {
  usuario: string = '';
  respostaTexto: string = '';
  curtidas: string[] = [];
  respostas?: Respostas[];
  criadoEm: Date = new Date();
  atualizadoEm: Date = new Date();
}

export class PostQuestion {
  _id: string = '';
  pergunta: string = '';
  respostas: Respostas[] = [];
  tags: string[] = [];
  criadoEm: Date = new Date();
  atualizadoEm: Date = new Date();
}

export class PostQuestionUser {
  _id: string = '';
  usuario: string = '';
  urlImg: string = '';
  posts: PostQuestion[] = [];
}
