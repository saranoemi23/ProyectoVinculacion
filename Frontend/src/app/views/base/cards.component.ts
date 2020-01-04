import { Component } from '@angular/core';
import axios from 'axios';

const URL = 'http://localhost:3000/asignaturas';

@Component({
  templateUrl: 'cards.component.html'
})
export class CardsComponent {

  // valores del form
  asignatura = '';
  descripcion = '';
  idasignatura = 0;

  // listado de asignaturas
  asignaturas = [];

  constructor() {
    this.cargarDatos();
  }

  cargarDatos() {
    axios.get(URL + '/get')
    .then(request => {
      this.asignaturas = request.data;
    })
  }

  //Evento que se ejecuta cuando hacen click en el boton para add
  guardar() {
    let a = this.asignatura;
    let d = this.descripcion;

    if (a == '' && d == '') {
      return alert('Agregue todos los datos para guardar');
    }
    
    if (this.idasignatura == 0) {
      this.agregarNueva();
    } else {
      this.editarAsignatura();
    }
  }


  agregarNueva() {

    let a = this.asignatura;
    let d = this.descripcion;

    //Llama el api y agrega los datos
    axios.post(URL + '/add', {
        asignatura: a,
        descripcion: d
      })

      // despues de guardar los datos
      .then(() => {
        // se actualiza la lista de asignaturas
        this.cargarDatos();
        this.limpiarForm();
      })

  }

  editarAsignatura() {

    let a = this.asignatura;
    let d = this.descripcion;
    let id = this.idasignatura;

    //Llama el api y agrega los datos
    axios.put(URL + '/edit/' + id, {
        asignatura: a,
        descripcion: d
      })

      // despues de guardar los datos
      .then(() => {
        // se actualiza la lista de asignaturas
        this.cargarDatos();
        this.limpiarForm();
      })

  }

  eliminarAsignatura(asignatura) {

    if (!confirm('Desea eliminar la asignatura?')) {
      return;
    }

    let id = asignatura.idasignatura;

    //Llama el api y agrega los datos
    axios.delete(URL + '/delete/' + id)

      // despues de guardar los datos
      .then(() => {
        // se actualiza la lista de asignaturas
        this.cargarDatos();
        this.limpiarForm();
      })

  }

  limpiarForm() {
    // se limpia el form
    this.asignatura = '';
    this.descripcion = '';
    this.idasignatura = 0;
  }

  seleccionarAsignatura(a) {
    this.asignatura = a.asignatura;
    this.descripcion = a.descripcion;
    this.idasignatura = a.idasignatura;
  }
}
