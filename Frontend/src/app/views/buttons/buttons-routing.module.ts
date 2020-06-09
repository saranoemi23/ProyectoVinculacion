import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ButtonsComponent } from './buttons.component';
import { DropdownsComponent } from './dropdowns.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Usuarios'
    },
    children: [
      {
        path: '',
        redirectTo: 'dashboard'
      },
      {
        path: 'mantenimientos',
        component: ButtonsComponent,
        data: {
          title: 'Mantenimientos'
        }
      },
      {
        path: 'roles',
        component: DropdownsComponent,
        data: {
          title: 'Roles'
        }
      },
    ],
  },
  {
    path: '',
    data: {
      title: 'Iventarios'
    },
    children: [
      {
        path: '',
        redirectTo: 'dashboard'
      },
    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ButtonsRoutingModule {}
