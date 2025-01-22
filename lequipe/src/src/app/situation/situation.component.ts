import { CommonModule, ViewportScroller } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';
import { Choice, Situation } from '../models/content-data';

@Component({
    selector: 'app-situation',
    standalone: true,
    imports: [
        CommonModule
    ],
    templateUrl: './situation.component.html',
    styleUrl: './situation.component.scss'
})
export class SituationComponent implements OnChanges {
    @Input({ required: true }) situation!: Situation;
    selected_choice?: Choice;

    constructor(private scroller: ViewportScroller) {}

    ngOnChanges(): void {
        this.selected_choice = undefined;
    }
}
