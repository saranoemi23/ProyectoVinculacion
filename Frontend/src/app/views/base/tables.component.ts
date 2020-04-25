import { Component } from '@angular/core';
import axios from 'axios';
import { config } from '../../../config';

const URL = config.backendURL() + '/periodos';

@Component({
  templateUrl: 'tables.component.html'
})
export class TablesComponent {

    // valores del form
    idperiodo = 0;
    periodo = '';
    descripcion = '';
  
    // listado de periodos
    periodos = [];

  constructor() { 
    this.cargarDatos();
  }

  cargarDatos() {
    axios.get(URL + '/get')
    .then(request => {
      this.periodos = request.data;
    })
  }

  guardar() {
    let a = this.idperiodo;
    let b = this.periodo;
    let c = this.descripcion;

    // if (a == '' && b == '' && c == '') {
    //   return alert('Agregue todos los datos para guardar');
    // }
    
    if (this.idperiodo == 0) {
      this.agregarNueva();
    } else {
      this.editarPeriodo();
    }
  }

  agregarNueva() {

    let a = this.idperiodo;
    let b = this.periodo;
    let c = this.descripcion;

    //Llama el api y agrega los datos
    axios.post(URL + '/add', {
        idperiodo: a,
        periodo: b,
        descripcion: c
      })

      .then(() => {
        this.cargarDatos();
        this.limpiarForm();
      })
  }

  editarPeriodo() {

    let a = this.idperiodo;
    let b = this.periodo;
    let c = this.descripcion;

    //Llama el api y agrega los datos
    axios.put(URL + '/edit/' + a, {
        periodo: b,
        descripcion: c
      })

      .then(() => {
        this.cargarDatos();
        this.limpiarForm();
      })

  }

  eliminarPeriodo(periodo) {

    if (!confirm('Desea eliminar el periodo?')) {
      return;
    }

    let id = periodo.idperiodo;

    //Llama el api y agrega los datos
    axios.delete(URL + '/delete/' + id)

      // despues de guardar los datos
      .then(() => {
        this.cargarDatos();
        this.limpiarForm();
      })

  }

  limpiarForm() {
    this.idperiodo = 0;
    this.periodo = '';
    this.descripcion = '';
  }

  seleccionarPeriodo(a) {
    this.idperiodo = a.idperiodo;
    this.periodo = a.periodo;
    this.descripcion = a.descripcion;
  }
}
