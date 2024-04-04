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
    {
      icon: 'bx bxs-dashboard',
      value: 'Home',
      link: RotasEnum.HOME,
    },
    {
      icon: 'bx bxs-invader',
      value: 'Item 1',
      link: 'item',
    },
    {
      icon: 'bx bxs-cog',
      value: 'Configurações',
      link: RotasEnum.CONFIGURACOES,
    },
  ];

  toggleSidebar() {
    this.sidebarExtend.update((current) => !current);
  }
}
