import { Component } from '@angular/core';
import axios from 'axios';
import { config } from '../../../config';

const URL = config.backendURL() + '/jornadas';

@Component({
  templateUrl: 'switches.component.html'
})
export class SwitchesComponent {

  idjornada = 0;
  jornada = '';
  descripcion = '';

  jornadas = [];
  
  constructor() { 
    this.cargarDatos();
  }

  cargarDatos() {
    axios.get(URL + '/get')
    .then(request => {
      this.jornadas = request.data;
    })
  }

  guardar(){
    let a = this.idjornada;
    let b = this.jornada;
    let c = this.descripcion;

    // if (a == '' && b == '' && c == '') {
    //   return alert ('Agregue todos los datos para guardar.');
    // }
    
    if (this.idjornada == 0){
      this.agregarNueva();
    } else {
      this.editarJornada();
    }
  }
  
    agregarNueva() {
      let a = this.idjornada;
      let b = this.jornada;
      let c = this.descripcion;

      axios.post(URL + '/add', {
        idjornada: a,
        jornada: b,
        descripcion: c
      })

      .then(() => {
        this.cargarDatos();
        this.limpiarForm();
      })
    }

    editarJornada() {
      let a = this.idjornada;
      let b = this.jornada;
      let c = this.descripcion;

      axios.put(URL + '/edit/' + a, {
        idjornada: a,
        jornada: b,
        descripcion: c
      })

      .then(() => {
        this.cargarDatos();
        this.limpiarForm();
      })
    }

    eliminarJornada(jornada) {

      if (!confirm('?Desea eliminar la jornada?')) {
      return;
    }

    let id = jornada.idjornada;

    axios.delete(URL + '/delete/' + id)

    .then(() => {
      this.cargarDatos();
      this.limpiarForm();
    })
  }

  limpiarForm() {
    this.idjornada = 0;
    this.jornada = '';
    this.descripcion = '';
  }

  seleccionarJornada(a) {
    this.idjornada = a.idjornada;
    this.jornada = a.jornada;
    this.descripcion = a.descripcion;
  }

}
