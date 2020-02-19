import { Injectable } from '@angular/core';
import {  calificaciones} from "../models/calificaciones";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CalificacionesService {
  API_URI = 'http://localhost:3000/calificaciones2/'

  constructor(private http: HttpClient) { }

  getCalificaciones(){
    return this.http.get<calificaciones[]>(`${this.API_URI}get`);
  }
  
  Getcalificacion(id: number){
    return this.http.get(`${this.API_URI}get/${id}`);
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
  

}
