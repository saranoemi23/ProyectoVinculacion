import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Matricula} from '../models/matricula';
import { config } from '../../config';

@Injectable({
  providedIn: 'root'
})
export class MatriculaService {

  API_URI = config.backendURL() + '/matriculas/'

  constructor(private http: HttpClient) { }

  getMatriculas(){
    return this.http.get(`${this.API_URI}get`);
  }
  
  getMatricula(id: number){
    return this.http.get(`${this.API_URI}get/${id}`);
  }

  deleteMatricula(id: number){
    console.log(id);
    return this.http.delete(`${this.API_URI}delete/${id}`);
  }
  
  saveMatricula(newMatricula: Matricula){
    return this.http.post(`${this.API_URI}add/`, newMatricula);
  }
  
  updateMatricula(id: number, updateMatricula: Matricula){
    console.log(id);
    return this.http.put(`${this.API_URI}edit/${id}`,updateMatricula);
  }
}
