import { Component } from '@angular/core';
import axios from 'axios';
import { config } from '../../../config';
import { NullTemplateVisitor } from '@angular/compiler';

const URL = config.backendURL() + '/calificacion';
const URL_GRADOS = config.backendURL() + '/grados';
const URL_PERIODOS = config.backendURL() + '/periodos';
const URL_ASIGNATURAS = config.backendURL() + '/asignaturas';


@Component({
  templateUrl: 'editar_calificaciones.component.html'
})
export class EditarCalificacionesComponent {

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
    grado = { idgrado: 0 };
    acumulado='';
    examen = '';
    total = 0;

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

  guardarCalificaciones(){
    let Acumulado = this.acumulado;
    let Examen = this.examen;
    let Total = this.total;
    let id_asignatura = this.asignatura;
    let id_grado = this.grado.idgrado;
    let id_alumno = this.idmatricula;
    let id_periodo = this.periodo;
    let anio = this.anio;
    
    axios.post(URL + '/add', {
      Acumulado,
      Examen,
      Total,
      id_asignatura,
      id_grado,
      id_alumno,
      id_periodo,
      anio
    })
    .then(request => {
      this.calificaciones = request.data; console.log(this.calificaciones);
    })
    this.limpiarForm();
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

  sumarTotal(){
    this.total = parseFloat(this.acumulado || "0") + parseFloat(this.examen || "0");
    
  }

  limpiarForm(){
    this.idCalificaciones = 0;
    this.examen = '';
    this.acumulado = '';
    this.asignatura = 0;
    this.grado.idgrado = 0;
    this.id_alumno = 0;
    this.id_periodo = 0;
    this.idmatricula = 0;
    this.periodo = 0;
    this.asignatura = 0;

  }

}
