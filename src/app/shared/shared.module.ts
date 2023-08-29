import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav/sidenav.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardComponent } from './card/card.component';
import { ContasTableComponent } from './contas-table/contas-table.component';

@NgModule({
  declarations: [SidenavComponent, CardComponent, ContasTableComponent],
  imports: [CommonModule, RouterModule],
  exports: [SidenavComponent, CardComponent, ContasTableComponent],
  providers: [BrowserModule, BrowserAnimationsModule],
})
export class SharedModule {}
