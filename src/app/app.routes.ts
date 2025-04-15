import { Routes } from '@angular/router';
import { AuthorizationComponent } from './authorization/authorization.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { BudgetsComponent } from './budgets/budgets.component';

export const routes: Routes = [
    {path: "", component: HomeComponent, canActivate: [AuthGuard]},
    {path: "auth", component: AuthorizationComponent},
    {path: "home", component: HomeComponent},
    {path: "budget", component: BudgetsComponent},
    { path: '**', redirectTo: '/auth', pathMatch: 'full' }
];
