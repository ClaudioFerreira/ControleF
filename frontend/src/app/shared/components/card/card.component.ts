import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input()
  tagId: string = '';

  @Input()
  variant: 'success' | 'alert' | 'danger' | 'default' = 'default';

  @Input()
  size: 'flex' | 'lg' | 'md' | 'sm' = 'flex';
}
