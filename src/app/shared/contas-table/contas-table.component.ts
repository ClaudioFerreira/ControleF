import { Component, Input } from '@angular/core';
import { contasData, tableHeader } from '../interfaces/contas-table.interface';

@Component({
  selector: 'app-contas-table',
  templateUrl: './contas-table.component.html',
  styleUrls: ['./contas-table.component.scss'],
})
export class ContasTableComponent {
  @Input()
  tableHeader!: tableHeader;
  @Input()
  contasData!: contasData;
}
