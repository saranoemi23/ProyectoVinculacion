import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MedicinasComponent } from './medicinas/medicinas.component';
import { AlimentosComponent } from './alimentos/alimentos.component';
import { MobiliariosComponent } from './mobiliarios/mobiliarios.component';

const routes: Routes = [
  {
    path: 'mobiliario',
    component: MobiliariosComponent,
    data: {
      title: 'Mobiliario'
    }
  },
  {
    path: 'alimento',
    component: AlimentosComponent,
    data: {
      title: 'Alimento'
    }
  },
  {
    path: 'medicina',
    component: MedicinasComponent,
    data: {
      title: 'Medicina'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventariosRoutingModule {}
