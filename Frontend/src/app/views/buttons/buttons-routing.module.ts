import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ButtonsComponent } from './buttons.component';
import { DropdownsComponent } from './dropdowns.component';
import { BrandButtonsComponent } from './brand-buttons.component';

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
      {
        path: 'brand-buttons',
        component: BrandButtonsComponent,
        data: {
          title: 'Brand buttons'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ButtonsRoutingModule {}
