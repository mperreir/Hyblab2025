import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ContentData } from '../models/content-data';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss'
})
export class SliderComponent {
  @Input() items?: ContentData[];
  @Output() selected_output: EventEmitter<ContentData> = new EventEmitter();
  selected?: ContentData;

  selectItem(item: ContentData, evt: EventTarget | null): void {
    this.selected = item;
    this.scrollToSelectedItem(evt as Element);
  }
  scrollToSelectedItem(evt: Element): void {
    evt.scrollIntoView({ behavior: "auto", block: 'end', inline: 'center' });
  }

  start(item: ContentData) {
    this.selected_output.emit(item);
  }
}
