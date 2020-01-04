import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardsComponent } from './cards.component';
import { FormsComponent } from './forms.component';
import { SwitchesComponent } from './switches.component';
import { TablesComponent } from './tables.component';
import { TabsComponent } from './tabs.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Academica'
    },
    children: [
      {
        path: '',
        redirectTo: 'cards'
      },
      {
        path: 'asignaturas',
        component: CardsComponent,
        data: {
          title: 'Asignaturas'
        }
      },
      {
        path: 'grados',
        component: FormsComponent,
        data: {
          title: 'Grados'
        }
      },
      {
        path: 'jornadas',
        component: SwitchesComponent,
        data: {
          title: 'Jornada'
        }
      },
      {
        path: 'periodos',
        component: TablesComponent,
        data: {
          title: 'Periodo'
        }
      },
      {
        path: 'secciones',
        component: TabsComponent,
        data: {
          title: 'Secciones'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseRoutingModule {}
