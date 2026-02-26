import { Routes } from '@angular/router';
import { EcommerceComponent } from './pages/dashboard/ecommerce/ecommerce.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { FormElementsComponent } from './pages/forms/form-elements/form-elements.component';
import { BasicTablesComponent } from './pages/tables/basic-tables/basic-tables.component';
import { BlankComponent } from './pages/blank/blank.component';
import { NotFoundComponent } from './pages/other-page/not-found/not-found.component';
import { AppLayoutComponent } from './shared/layout/app-layout/app-layout.component';
import { InvoicesComponent } from './pages/invoices/invoices.component';
import { LineChartComponent } from './pages/charts/line-chart/line-chart.component';
import { BarChartComponent } from './pages/charts/bar-chart/bar-chart.component';
import { AlertsComponent } from './pages/ui-elements/alerts/alerts.component';
import { AvatarElementComponent } from './pages/ui-elements/avatar-element/avatar-element.component';
import { BadgesComponent } from './pages/ui-elements/badges/badges.component';
import { ButtonsComponent } from './pages/ui-elements/buttons/buttons.component';
import { ImagesComponent } from './pages/ui-elements/images/images.component';
import { VideosComponent } from './pages/ui-elements/videos/videos.component';
import { SignInComponent } from './pages/auth-pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/auth-pages/sign-up/sign-up.component';
import { CalenderComponent } from './pages/calender/calender.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { AuthGuard } from './config/AuthGuard';
import { AccountComponent } from './pages/accounts/account.component';
import { MovementsComponent } from './pages/movements/movements.component';
import { OperationsHubComponent } from './pages/OperationsHubComponent/operations-hub.component';

export const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: AppLayoutComponent,
    children: [
      {
        path: '',
        component: EcommerceComponent,
        canActivate: [AuthGuard],
        pathMatch: 'full',
        title:
          'Akira',
      },
      {
        path: 'profile',
        component: ProfileComponent,
        title: 'Mi Perfil'
      },

      {
        path: 'accounts',
        component: AccountComponent,
        title: 'Mis Cuentas'
      },
      {
        path: 'categories',
        component: CategoriesComponent,
        title: 'Categorias'
      },
      {
        path: 'movements',
        component: MovementsComponent,
        title: 'Movimientos'
      },
      {
        path: 'financialCenter',
        component: OperationsHubComponent,
        title: 'Centro Financiero'
      }
    ]
  },
  // auth pages
  {
    path: 'signin',
    component: SignInComponent,
    title: 'Inicia sesión'
  },
  {
    path: 'signup',
    component: SignUpComponent,
    title: 'Regístrate'
  },
  // error pages
  {
    path: '**',
    component: NotFoundComponent,
    title: 'No encontrado'
  },
];
