import { Routes } from '@angular/router';
import { RoleplayComponent } from './roleplay/roleplay.component';
import { HomeComponent } from './index/index.component';
import { CreditsComponent } from './credits/credits.component';
import { MakingoffComponent } from './makingoff/makingoff.component';
import { TestComponent } from './test/test.component';


export const routes: Routes = [
    { path: '', redirectTo: 'index', pathMatch: 'full' },
    { path: 'index', component: HomeComponent },
    { path: 'roleplay', component: RoleplayComponent },
    { path: 'test', component: TestComponent },
    { path: 'credits', component: CreditsComponent },
    { path: 'makingoff', component: MakingoffComponent }
];