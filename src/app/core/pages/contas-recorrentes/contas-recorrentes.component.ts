import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contas } from 'src/app/shared/class/contas';
import {
  contasData,
  tableHeader,
} from 'src/app/shared/interfaces/contas-table.interface';

@Component({
  selector: 'app-contas-recorrentes',
  templateUrl: './contas-recorrentes.component.html',
  styleUrls: ['./contas-recorrentes.component.scss'],
})
export class ContasRecorrentesComponent implements OnInit {
  formCadastroConta!: FormGroup;
  tableHeader: tableHeader = [
    { name: 'Descricao' },
    { name: 'Vencimento' },
    { name: 'Valor' },
    // { name: 'Pago' },
    { name: 'Observacoes' },
  ];

  contasData: contasData = [
    {
      descricao: 'Energia',
      dataVencimento: Date.now().toString(),
      valor: 123.42,
      // pago: true,
      observacoes: 'Observacoes',
    },
    {
      descricao: 'Agua',
      dataVencimento: Date.now().toString(),
      valor: 100.42,
      // pago: false,
      observacoes: 'Observacoes',
    },
  ];

  modalAberto = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createForm(new Contas());
  }

  createForm(conta: Contas) {
    this.formCadastroConta = this.fb.group({
      descricao: [conta.descricao, [Validators.required]],
      dataVencimento: [conta.dataVencimento, [Validators.required]],
      valor: [conta.valor],
      observacoes: [conta.observacoes],
    });
  }

  abreFechaModal() {
    this.modalAberto = !this.modalAberto;
  }

  onSubmit() {}
}
