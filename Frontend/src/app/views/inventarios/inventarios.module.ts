import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { InventariosRoutingModule } from './inventarios-routing.module'
import { MobiliariosComponent } from './mobiliarios/mobiliarios.component';
import { MedicinasComponent } from './medicinas/medicinas.component';
import { AlimentosComponent } from './alimentos/alimentos.component';

@NgModule({
  imports: [
    InventariosRoutingModule,
    CommonModule,
    FormsModule
  ],
  providers: [DatePipe], declarations: [MobiliariosComponent, MedicinasComponent,AlimentosComponent, ]
})
export class InventariosModule { }
