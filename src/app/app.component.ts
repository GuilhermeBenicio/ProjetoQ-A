import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'projeto_BD';
  public userInfo = '';

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    // Aqui você pode fazer chamadas HTTP para a API
  }
}
