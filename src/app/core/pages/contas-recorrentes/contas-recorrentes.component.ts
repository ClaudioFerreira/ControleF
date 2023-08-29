import { Component } from '@angular/core';
import {
  contasData,
  tableHeader,
} from 'src/app/shared/interfaces/contas-table.interface';

@Component({
  selector: 'app-contas-recorrentes',
  templateUrl: './contas-recorrentes.component.html',
  styleUrls: ['./contas-recorrentes.component.scss'],
})
export class ContasRecorrentesComponent {
  tableHeader: tableHeader = [
    { name: 'Descricao' },
    { name: 'Vencimento' },
    { name: 'Valor' },
    { name: 'Pago' },
    { name: 'Observacoes' },
  ];

  contasData: contasData = [
    {
      descricao: 'Energia',
      dataVencimento: Date.now().toString(),
      valor: 123.42,
      pago: true,
      observacoes: 'Observacoes',
    },
    {
      descricao: 'Agua',
      dataVencimento: Date.now().toString(),
      valor: 100.42,
      pago: false,
      observacoes: 'Observacoes',
    },
  ];
}
