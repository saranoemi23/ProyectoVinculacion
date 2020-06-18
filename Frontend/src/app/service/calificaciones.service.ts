import { Injectable } from '@angular/core';
import {  calificaciones} from "../models/calificaciones";
import { HttpClient } from '@angular/common/http';
import { config } from '../../config';

import * as FileSaver from 'file-saver';
import * as XLMS from 'xlsx';
import { DatePipe } from '@angular/common';

const EXCEL_TYPE= '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class CalificacionesService {
  API_URI = config.backendURL() + '/calificaciones2/'

  constructor(private http: HttpClient) { }

  getCalificaciones(){
    return this.http.get<calificaciones[]>(`${this.API_URI}get`);
  }
  
  deletecalificacion(id: number){
    console.log(id);
    return this.http.delete(`${this.API_URI}delete/${id}`);
  }
  
  savecalificacion(newcalificacion: calificaciones){
    return this.http.post(`${this.API_URI}add/`, newcalificacion);
  }
  
  updatecalificacion(id: number, updatecalificacion: calificaciones){
    console.log(id);
    return this.http.put(`${this.API_URI}edit/${id}`,updatecalificacion);
  }

  filtroGrado(grado:number,periodo:number,seccion:number){
    return this.http.get(`${this.API_URI}filtro_c/${grado}/${periodo}/${seccion}`);
  }
  
  filtroAlumno(grado:number,periodo:number,seccion:number,alumno:number){
    return this.http.get(`${this.API_URI}filtro_a/${grado}/${periodo}/${seccion}/${alumno}`);
  }

  Filtrolumnos(grado:string,periodo:string ,seccion:string){
    return this.http.get(`${this.API_URI}alumnos/${grado}/${periodo}/${seccion}`);
  }


  //Agregando opcion para descarga en excel
  exportToExcel(json:any[],excelName:string):void{
    const workshhet: XLMS.WorkSheet = XLMS.utils.json_to_sheet(json);
    const workbook : XLMS.WorkBook= {Sheets:{'data':workshhet},
    SheetNames:['data']
    };
    const excelBuffer: any = XLMS.write(workbook,{bookType:'xlsx',type:'array'});
    //llammar al metodo guardado en buffer
    this.saveAsExcel(excelBuffer,excelName);
  }

  private saveAsExcel(buffer:any,filename:string):void{
    const data:Blob= new Blob([buffer],{type:EXCEL_TYPE});
    FileSaver.saveAS(data,filename+'_export_'+ new Date().getTime()+EXCEL_TYPE);
  }

}
