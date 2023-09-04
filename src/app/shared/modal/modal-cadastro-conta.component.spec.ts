import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCadastroContaComponent } from './modal-cadastro-conta.component';

describe('ModalCadastroContaComponent', () => {
  let component: ModalCadastroContaComponent;
  let fixture: ComponentFixture<ModalCadastroContaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalCadastroContaComponent],
    });
    fixture = TestBed.createComponent(ModalCadastroContaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
