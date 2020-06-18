import { Component } from '@angular/core';
import axios from 'axios';
import { config } from '../../../config';

const URL = config.backendURL() + '/calificacion';
const URL_GRADOS = config.backendURL() + '/grados';
const URL_PERIODOS = config.backendURL() + '/periodos';
const URL_ASIGNATURAS = config.backendURL() + '/asignaturas';


@Component({
  templateUrl: 'calificaciones.component.html'
})
export class CalificacionesComponent {

  // valores del form
    idCalificaciones = 0;
    Examen = '';
    Acumulado = '';
    id_asignatura = 0;
    id_grado_detalle = 0;
    id_alumno = 0;
    id_periodo = 0;
    anio = 0;
    idmatricula = 0;
    periodo = 0;
    asignatura = 0;

    grados = [];
    calificaciones = [];
    alumnos = [];
    periodos = [];
    asignaturas = [];
    // grado seleccionado
    grado = {
    idgrado:0
  };

  constructor() {
    var fechaActual = new Date();
    this.anio = fechaActual.getFullYear();

    this.cargarDatos();
  }

  cargarDatos() {

    axios.get(URL_GRADOS + '/get')
    .then(request => {
      this.grados = request.data; console.log(this.grados);
    })

    axios.get(URL_PERIODOS + '/get')
    .then(request => {
      this.periodos = request.data; console.log(this.periodos);
    })

    axios.get(URL_ASIGNATURAS + '/get')
    .then(request => {
      this.asignaturas = request.data; console.log(this.asignaturas);
    })
  }
  cargarAlumnos() {
    console.log('this.grado', this.grado);
    let grado = this.grado.idgrado;
    let anio = this.anio;
    console.log('cargando alumnos', this.grado);

    if (!anio) {
      return alert('Seleccione un año');
    }

    if (!grado) {
      return alert('Seleccione un grado');
    }

    axios.post(URL + '/cargar-alumnos', {
      grado: grado,
      anio: anio,
    })
    .then(request => {
      this.alumnos = request.data;
      console.log('alumnos', this.alumnos);

    })

  }
  cargarCalificaciones(){
    let grado = this.grado.idgrado;
    let anio = this.anio;
    let matricula = this.idmatricula;
    let asignatura = this.asignatura;
    let periodo = this.periodo;

    if (!grado){
      alert("Seleccione el grado.")
      return
    }
    
    axios.post(URL + '/get', {
      grado: grado,
      anio: anio,
      matricula: matricula,
      periodo: periodo,
      asignatura: asignatura,
    })
    .then(request => {
      this.calificaciones = request.data; console.log(this.calificaciones);
    })
  }

  eliminar(calificaciones){
    var respuesta = confirm("Desea eliminar éste registro")
    var id=calificaciones.id;
    if (!respuesta) return;

    axios.delete(URL + "/delete/" + id) 
    .then(() => this.cargarDatos())
  }

}
