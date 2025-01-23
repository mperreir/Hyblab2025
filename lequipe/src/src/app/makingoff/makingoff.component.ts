import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-makingoff',
  standalone: true,
  imports: [],
  templateUrl: './makingoff.component.html',
  styleUrl: './makingoff.component.scss'
})
export class MakingoffComponent {
  constructor (public router: Router) {}
}
