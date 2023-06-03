import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostComentariosComponent } from './post-comentarios.component';

describe('PostComentariosComponent', () => {
  let component: PostComentariosComponent;
  let fixture: ComponentFixture<PostComentariosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostComentariosComponent]
    });
    fixture = TestBed.createComponent(PostComentariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
