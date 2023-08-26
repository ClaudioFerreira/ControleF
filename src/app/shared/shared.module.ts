import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav/sidenav.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardComponent } from './card/card.component';

@NgModule({
  declarations: [SidenavComponent, CardComponent],
  imports: [CommonModule, RouterModule],
  exports: [SidenavComponent, CardComponent],
  providers: [BrowserModule, BrowserAnimationsModule],
})
export class SharedModule {}
