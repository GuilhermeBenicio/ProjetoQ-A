import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'projeto_BD';
  profileImageUrl: string = '';
  personName: string = '';
  personAge: number = 0;
  personPhone: string = '';
  personEmail: string = '';

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    // Aqui você pode fazer chamadas HTTP para a API
    this.http.get('https://randomuser.me/api/').subscribe((data: any) => {
      const user = data.results[0];
      const firstName = user.name.first;
      const lastName = user.name.last;
      this.personName = `${firstName} ${lastName}`;

      this.personAge = user.dob.age;
      this.personPhone = user.phone;
      this.personEmail = user.email;
    });

    this.http
      .get('https://dog.ceo/api/breeds/image/random')
      .subscribe((data: any) => {
        console.log(data);
        const teste = data.message;
        this.profileImageUrl = teste;
      });
  }
}
