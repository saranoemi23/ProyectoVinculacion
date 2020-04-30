import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ButtonsComponent } from './buttons.component';
import { DropdownsComponent } from './dropdowns.component';
import { MobiliariosComponent } from '../inventarios/mobiliarios/mobiliarios.component';
import { MedicinasComponent } from '../inventarios/medicinas/medicinas.component';
import { AlimentosComponent } from '../inventarios/alimentos/alimentos.component';

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
      {
        path: 'mobiliario',
        component: MobiliariosComponent,
        data: {
          title: 'mobiliario'
        }
      },
      {
        path: 'medicinas',
        component: MedicinasComponent,
        data: {
          title: 'medicinas'
        }
      },
      {
        path: 'alimentos',
        component: AlimentosComponent,
        data: {
          title: 'alimentos'
        }
      },
    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ButtonsRoutingModule {}
