import { Component } from '@angular/core';
import axios from 'axios';

const URL = 'http://localhost:3000/secciones';

@Component({
  templateUrl: 'tabs.component.html'
})
export class TabsComponent {

  idseccion = 0;
  seccion = '';
  descripcion = '';
  
  secciones = [];

  constructor() { 
    this.cargarDatos();
  }

  cargarDatos() {
    axios.get(URL + '/get')
    .then(request => {
      this.secciones = request.data;
    })
}

guardar() {
  let a = this.idseccion;
  let b = this.seccion;
  let c = this.descripcion;

  if (a == 0 && b == '' && c == '')  {
    return alert('Agregue todos los datos para guardar');
  }
  
  if (this.idseccion == 0) {
    this.agregarNueva();
  } else {
    this.editarSeccion();
  }
}


agregarNueva() {
  let a = this.idseccion;
  let b = this.seccion;
  let c = this.descripcion;

  axios.post(URL + '/add', {
      idseccion: a,
      seccion: b,
      descripcion: c

    })

    .then(() => {
      this.cargarDatos();
      this.limpiarForm();
    })

}

editarSeccion() {
  let a = this.idseccion;
  let b = this.seccion;
  let c = this.descripcion;

  axios.put(URL + '/edit/' + a, {
      seccion: b,
      descripcion: c
    })

    .then(() => {
      this.cargarDatos();
      this.limpiarForm();
    })

}

eliminarSeccion(seccion) {

  if (!confirm('Desea eliminar la seccion?')) {
    return;
  }

  let id = seccion.idseccion;

  axios.delete(URL + '/delete/' + id)

    .then(() => {
      this.cargarDatos();
      this.limpiarForm();
    })

}
  limpiarForm() {
    this.idseccion = 0;
    this.seccion = '';
    this.descripcion = '';
  }

  seleccionarSeccion(a) {
    this.idseccion = a.idseccion;
    this.seccion = a.seccion;
    this.descripcion = a.descripcion;
  }

}
