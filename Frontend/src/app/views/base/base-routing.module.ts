import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardsComponent } from './cards.component';
import { FormsComponent } from './forms.component';
import { SwitchesComponent } from './switches.component';
import { TablesComponent } from './tables.component';
import { TabsComponent } from './tabs.component';
import { CalificacionesComponent } from '../calificaciones/calificaciones.component';
import { EditarCalificacionesComponent } from '../calificaciones/editar_calificaciones.component';
//import { CollapsesComponent } from './collapses.component';

const routes: Routes = [
  {
    path: '', 
    data: {
      title: 'Calificaciones'
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
      },
      {
        path: 'calificaciones',
        component: CalificacionesComponent,
        data: {
          title: 'Calificaciones'
        },
      },
      {
        path: 'editarcalificaciones',
        component: EditarCalificacionesComponent,
        data: {
          title: 'Editar Calificaciones'
        },  
      },
      {
        path: 'agregarcalificaciones',
        component: EditarCalificacionesComponent,
        data: {
          title: 'Agregar Calificación'
        },  
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseRoutingModule {}
