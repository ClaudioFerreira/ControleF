import { Component } from '@angular/core';
import { SideNavToggle } from '../../shared/sidenav/nav-util';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss'],
})
export class CoreComponent {
  isSideNavCollapsed = false;
  screenWidth = 0;

  onToggleSideNav(data: SideNavToggle): void {
    this.isSideNavCollapsed = data.collapsed;
    this.screenWidth = data.screenWidth;
  }

  getBodyClass(): string {
    let bodyStyleClass = '';

    if (this.isSideNavCollapsed && this.screenWidth > 768) {
      bodyStyleClass = 'core__body-trimmed';
    } else if (
      this.isSideNavCollapsed &&
      this.screenWidth <= 768 &&
      this.screenWidth > 0
    ) {
      bodyStyleClass = 'core__body-md-screen';
    }
    return bodyStyleClass;
  }
}
