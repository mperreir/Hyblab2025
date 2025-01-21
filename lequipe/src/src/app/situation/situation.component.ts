import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';
import { Choice, Result, Situation } from '../models/content-data';

@Component({
    selector: 'app-situation',
    standalone: true,
    imports: [
        CommonModule
    ],
    templateUrl: './situation.component.html',
    styleUrl: './situation.component.scss'
})
export class SituationComponent implements OnChanges{
    @Input({ required: true }) situation!: Situation | Result;
    selected_choice?: Choice;

    ngOnChanges(): void {
        this.selected_choice = undefined;
    }
}
