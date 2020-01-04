import { Component } from '@angular/core';
import axios from 'axios';

const URL = 'http://localhost:3000/grados';
const URL_JORNADAS = 'http://localhost:3000/jornadas';
const URL_SECCIONES = 'http://localhost:3000/secciones';

@Component({
  templateUrl: 'forms.component.html'
})
export class FormsComponent {

    // valores del form
    idgrado = 0;
    grado = '';
    idjornada = 0;
    idseccion = 0;
  
    // listado de grados
    grados = [];

    // listados para los <select>
    jornadas = [];
    secciones = [];

  constructor() { 
    this.cargarDatos();
  }

  cargarDatos() {

    // GRADOS
    axios.get(URL + '/get')
    .then(request => {
      this.grados = request.data;
    })

    // JORNADAS
    axios.get(URL_JORNADAS + '/get')
    .then(request => {
      this.jornadas = request.data;
    })

    // SECCIONES
    axios.get(URL_SECCIONES + '/get')
    .then(request => {
      this.secciones = request.data;
    })
  }

    //Evento que se ejecuta cuando hacen click en el boton para add
    guardar() {
      let g = this.grado;
      let j = this.idjornada;
      let s = this.idseccion;
      
      // if (g == '' && j == '' && s == '') {
      //   return alert('Agregue todos los datos para guardar');
      // }
      
      if (this.idgrado == 0) {
        this.agregarNueva();
      } else {
        this.editarGrado();
      }
    }


  agregarNueva() {

    let g = this.grado;
    let j = this.idjornada;
    let s = this.idseccion;
    //Llama el api y agrega los datos
    axios.post(URL + '/add', {
        grado: g,
        idjornada: j,
        idseccion: s,
        idperiodo: 0,
      })

      // despues de guardar los datos
      .then(() => {
        // se actualiza la lista de asignaturas
        this.cargarDatos();
        this.limpiarForm();
      })

  }

  editarGrado() {

    let g = this.grado;
    let j = this.idjornada;
    let s = this.idseccion;

    //Llama el api y agrega los datos
    axios.put(URL + '/edit/' + this.idgrado, {
      grado: g,
      idjornada: j,
      idseccion: s,
      idperiodo: 0,
      })

      // despues de guardar los datos
      .then(() => {
        // se actualiza la lista de asignaturas
        this.cargarDatos();
        this.limpiarForm();
      })

  }

  eliminarGrado(grado) {

    if (!confirm('Desea eliminar el grado?')) {
      return;
    }

    let id = grado.idgrado;

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
    this.grado = '';
    this.idjornada = 0;
    this.idseccion = 0;
  }

  seleccionarGrado(a) {
    this.grado = a.grado;
    this.idgrado = a.idgrado;
    this.idjornada = a.idjornada;
    this.idseccion = a.idseccion;
  }
}

