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
    this.scrollToSelectedItem(evt);
  }
  scrollToSelectedItem(evt: EventTarget | null): void {
    // const selectedElement = document.querySelector('.selected');
    // if (selectedElement) {
    //   selectedElement.scrollIntoView({ behavior: "smooth",block: 'start', inline: 'center' });
    // }
    if (evt) {
      (evt as Element).scrollIntoView({ behavior: "auto",block: 'start', inline: 'center' });
      }
  }
}
