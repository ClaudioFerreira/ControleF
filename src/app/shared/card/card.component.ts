import { Component, Input } from '@angular/core';
import { ICardHeaderData } from '../interfaces/card.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() CardHeaderData: ICardHeaderData | undefined;
  @Input() CardConfig: any;
}
