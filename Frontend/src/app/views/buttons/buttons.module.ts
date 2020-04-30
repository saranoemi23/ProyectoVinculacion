import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';




// Buttons Routing
import { ButtonsComponent } from './buttons.component';
import { DropdownsComponent } from './dropdowns.component';
import { ButtonsRoutingModule } from './buttons-routing.module';
import { AlimentosComponent } from '../inventarios/alimentos/alimentos.component';
import { MedicinasComponent } from '../inventarios/medicinas/medicinas.component';
import { MobiliariosComponent } from '../inventarios/mobiliarios/mobiliarios.component';;

// Angular

@NgModule({
  imports: [
    CommonModule,
    ButtonsRoutingModule,
    FormsModule
  ],
  declarations: [
    ButtonsComponent,
    DropdownsComponent,
    MobiliariosComponent,
    MedicinasComponent,
    AlimentosComponent,
  ]
})
export class ButtonsModule { }
