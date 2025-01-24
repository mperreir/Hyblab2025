import { Component, Inject, Input } from '@angular/core';
import { Item } from '../models/content-data';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss'
})
export class SliderComponent {
  @Input() items!: Item[];
  selected?: Item;

  selectItem(item: Item, evt: EventTarget | null): void {
    this.selected = item;
    this.scrollToSelectedItem(evt as Element);
  }
  scrollToSelectedItem(evt: Element): void {
    evt.scrollIntoView({ behavior: "auto", block: 'start', inline: 'center' });
  }
}
