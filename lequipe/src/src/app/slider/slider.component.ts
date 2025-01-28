import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { ContentData } from '../models/content-data';

@Component({
    selector: 'app-slider',
    standalone: true,
    imports: [],
    templateUrl: './slider.component.html',
    styleUrl: './slider.component.scss'
})
export class SliderComponent implements OnChanges {
    @Input() items?: ContentData[];
    @Output() selected_output: EventEmitter<ContentData> = new EventEmitter();
    selected?: ContentData;

    ngOnChanges(): void {
        if (this.items) this.selected = this.items[0];
    }

    scroll_detected(): void {
        let element = document.elementFromPoint(window.innerWidth/2, window.innerHeight/2)?.parentElement
        if (element && element.classList.contains('item') && !element.classList.contains('selected')) {
            element.click();
        }
    }

    selectItem(item: ContentData, evt: EventTarget | null): void {
        this.selected = item;
        this.scrollToSelectedItem(evt as HTMLElement);
    }

    scrollToSelectedItem(evt: HTMLElement): void {
        // tous les trucs commentés ont été testés et ne marchent pas

        // evt.style.scrollSnapAlign = 'none';
        // setTimeout(() => {
        //     evt.style.scrollSnapAlign = 'center';
        // }, 500);

        // if (evt.parentElement) { evt.parentElement.style.scrollSnapType = 'none'; }
        // setTimeout(() => {
        //     if (evt.parentElement) { evt.parentElement.style.scrollSnapType = 'x mandatory'; }
        // }, 500);

        evt.scrollIntoView({ behavior: "smooth", block: 'end', inline: 'center' });
    }

    start(item: ContentData) {
        this.selected_output.emit(item);
    }
}
