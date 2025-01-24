import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-makingoff',
  standalone: true,
  imports: [
    HeaderComponent
  ],
  templateUrl: './makingoff.component.html',
  styleUrl: './makingoff.component.scss'
})
export class MakingoffComponent {
  constructor (public router: Router) {}
}
