import { Component, OnInit } from '@angular/core';
import { SliderComponent } from "../slider/slider.component";
import { Item } from '../models/content-data';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [SliderComponent],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent {
    item1! : Item;
    item2! : Item;
    item3! : Item;
    item4! : Item;
    item5! : Item;
    item6! : Item;
    ngOnInit(): void {
      this.item1 = new Item("bob","square1.png")
      this.item2 = new Item("boub","square2.png")
      this.item3 = new Item("bub","square3.png")
      this.item4 = new Item("bob","square1.png")
      this.item5 = new Item("boub","square2.png")
      this.item6 = new Item("bub","square3.png")
    }
}
