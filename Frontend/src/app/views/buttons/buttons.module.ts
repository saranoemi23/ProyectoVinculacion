import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';




// Buttons Routing
import { ButtonsComponent } from './buttons.component';
import { DropdownsComponent } from './dropdowns.component';
import { ButtonsRoutingModule } from './buttons-routing.module';

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
  ]
})
export class ButtonsModule { }
