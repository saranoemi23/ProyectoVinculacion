import { Component, OnInit } from '@angular/core';
import { CalificacionesService } from "../../service/calificaciones.service";
import {  calificaciones} from "../../models/calificaciones";

@Component({
  selector: 'app-calificaciones',
  templateUrl: './calificaciones.component.html',
  styleUrls: ['./calificaciones.component.css']
})
export class CalificacionesComponent implements OnInit {
   calificacio :calificaciones[];
   calificacion : any=[];
   notas :any;

  constructor(private calificacionService : CalificacionesService) {
    this.calificacion = new calificaciones();
   }


  ngOnInit() {
 //   this.getcalificaciones();
   
  }

    getcalificaciones(){
      this.calificacionService.getCalificaciones().subscribe(data => {
        this.calificacio = data;
      } ,
        err => console.error(err) )
    };

    updatecalificacion(id:number){
      this.calificacionService.updatecalificacion(id,this.calificacion)
      .subscribe(data =>{
        this.calificacion=data;
      });
    }

     
    savecalificacion(){
      this.calificacionService.savecalificacion(this.calificacion).subscribe(  
      res =>{
        this.calificacion=res;
      },
      err => console.error()
      ) ;   
    }

    deletecalificacion(id:number){
      this.calificacionService.deletecalificacion(id).subscribe(() =>
        {
          this.getcalificaciones();
        }
      )
    }

    MostrarGradoFiltro(grado,periodo,seccion){
      {
        this.calificacionService. filtroGrado(grado,periodo,seccion).subscribe(data => {
          this.notas = data;
        } ,
          err => console.error(err) )
      };
    }

}
