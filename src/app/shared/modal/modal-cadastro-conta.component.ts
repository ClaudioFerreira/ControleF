import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-cadastro-conta',
  templateUrl: './modal-cadastro-conta.component.html',
  styleUrls: ['./modal-cadastro-conta.component.scss'],
})
export class ModalCadastroContaComponent {
  @Input()
  size!: string;
  @Input()
  title: any;
  @Input()
  open!: boolean | false;

  @Output()
  fechaModalEmit = new EventEmitter();

  fecharModal() {
    this.fechaModalEmit.emit();
  }
}
