import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostagensGeraisComponent } from './postagens-gerais.component';

describe('PostagensGeraisComponent', () => {
  let component: PostagensGeraisComponent;
  let fixture: ComponentFixture<PostagensGeraisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostagensGeraisComponent]
    });
    fixture = TestBed.createComponent(PostagensGeraisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
