import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children:[
        {
          path: 'home',
          children:[{
          path:'',
          loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
          }]
        },
        {
          path: 'categories',
          children:[{
          path:'',
          loadChildren: () => import('./categories/categories.module').then( m => m.CategoriesPageModule)
          }]
        },
         {
          path: 'message',
          loadChildren: () => import('./message/message.module').then( m => m.MessagePageModule)
          },
            {
          path: 'profile',
          loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
         },
           {
          path: 'settings',
          loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule)
         },

    ]
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
