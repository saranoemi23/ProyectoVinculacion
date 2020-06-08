// Angular
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { CardsComponent } from './cards.component';

// Forms Component
import { FormsComponent } from './forms.component';
import { CalificacionesComponent } from "../calificaciones/calificaciones.component";

import { SwitchesComponent } from './switches.component';
import { TablesComponent } from './tables.component';

// Tabs Component
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TabsComponent } from './tabs.component';


// Dropdowns Component
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';



// Components Routing
import { BaseRoutingModule } from './base-routing.module';
import { EditarCalificacionesComponent } from '../calificaciones/editar_calificaciones.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BaseRoutingModule,
    BsDropdownModule.forRoot(),
    TabsModule,
  ],
  declarations: [
    CardsComponent,
    FormsComponent,
    SwitchesComponent,
    TablesComponent,
    TabsComponent,
    CalificacionesComponent,
    EditarCalificacionesComponent
  ]
})
export class BaseModule { }
