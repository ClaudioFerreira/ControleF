import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  cardsData = [
    {
      titulo: 'Contas Recorrentes',
      valor: 1042,
      cardConfig: {
        cor: '',
        icone: '',
        fontColor: '',
      },
    },
    {
      titulo: 'Constas Temporarias ',
      valor: 1042,
      cardConfig: {
        cor: '',
        icone: '',
        fontColor: '',
      },
    },
    {
      titulo: 'Reserva Emergencia',
      valor: 1042,
      cardConfig: {
        cor: '',
        icone: '',
        fontColor: '',
      },
    },
    {
      titulo: 'Investimentos',
      valor: 1042,
      cardConfig: {
        cor: '',
        icone: '',
        fontColor: '',
      },
    },
  ];
}
