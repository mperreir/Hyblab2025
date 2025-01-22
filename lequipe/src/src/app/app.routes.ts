import { Routes } from '@angular/router';
import { RoleplayComponent } from './roleplay/roleplay.component';
import { HomeComponent } from './home/home.component';


export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'roleplay', component: RoleplayComponent }
];
