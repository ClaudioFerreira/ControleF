import { Component } from '@angular/core';
import { CardComponent } from '../../shared/components/card/card.component';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SidebarComponent, CardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  acompanhamentos = [
    {
      nome: 'Reserva emergencia',
      valor: '123,12',
    },
    {
      nome: 'Investimentos',
      valor: '123,12',
    },
    {
      nome: 'Card 3',
      valor: '123,12',
    },
    {
      nome: 'Card 4',
      valor: '123,12',
    },
  ];
}
