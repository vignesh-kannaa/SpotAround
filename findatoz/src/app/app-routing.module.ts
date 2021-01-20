import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
 
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    loadChildren: () => import('./Tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./Auth/authentication.module').then( m => m.AuthenticationPageModule)
  },
  {
    path: 'error-page',
    loadChildren: () => import('./CommonComponent/error-page/error-page.module').then( m => m.ErrorPagePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
