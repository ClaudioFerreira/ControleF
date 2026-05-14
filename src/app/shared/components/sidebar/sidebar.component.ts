import { CommonModule } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { userInfoSidebar } from '../../interfaces/user.interface';
import { RotasEnum } from './../../enums/rotas.enum';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  @Input()
  userInfos: userInfoSidebar = {
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoNQ9M3yDh8harMH3RhyBQu97VO5ArmqZChxCXJNs22etjH5xmtPWIFeganUPbMJH5DPU&usqp=CAU',
    name: 'Claudio Ferreira',
    description: 'Engenheiro de software',
  };

  sidebarExtend = signal(false);

  menuContent = [
    { icon: 'bx bxs-dashboard', value: 'Dashboard', link: RotasEnum.HOME },
    { icon: 'bx bxs-receipt', value: 'Contas Recorrentes', link: RotasEnum.ACCOUNTS },
    { icon: 'bx bxs-credit-card', value: 'Parceladas', link: RotasEnum.INSTALLMENTS },
    { icon: 'bx bxs-wallet', value: 'Gastos', link: RotasEnum.EXPENSES },
    { icon: 'bx bxs-chart', value: 'Investimentos', link: RotasEnum.INVESTMENTS },
    { icon: 'bx bxs-calendar-check', value: 'Controle Mensal', link: RotasEnum.MONTHLY_CONTROL },
  ];

  toggleSidebar() {
    this.sidebarExtend.update((current) => !current);
  }
}
