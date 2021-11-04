
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { LoginGuard } from './components/guard/login.guard';

const routes: Routes = [
  { path: 'inicio', component: LoginComponent},
  { path: 'registro', component: RegisterComponent },
  { path: '**', component: LoginComponent }
];

export const AppRoutes = RouterModule.forRoot(routes, { useHash: true });

