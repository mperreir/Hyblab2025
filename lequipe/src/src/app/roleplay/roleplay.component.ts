import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ContentData } from '../models/content-data';
import { SituationComponent } from '../situation/situation.component';

@Component({
    selector: 'app-roleplay',
    standalone: true,
    imports: [
        CommonModule,
        SituationComponent
    ],
    templateUrl: './roleplay.component.html',
    styleUrl: './roleplay.component.scss'
})
export class RoleplayComponent implements OnInit {
    title = "Hyblab-angular L'Equipe";
    data?: ContentData[];
    selected_scenario?: ContentData;

    constructor(private http: HttpClient) { }

    ngOnInit(): void {
        this.fetchData().subscribe((response) => {
            this.data = response;
            console.log(this.data);
        });
    }

    fetchData(): Observable<ContentData[]> {
        return this.http.get<ContentData[]>('assets/data.json');
    }

    toggle_menu(): void {
    }

    selectScenario(item: ContentData): void {
        this.selected_scenario = item;
        this.scrollToSelectedScenario();
    }
    scrollToSelectedScenario(): void {
        const selectedElement = document.querySelector('.selected');
        if (selectedElement) {
            selectedElement.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
        }
    }
}
