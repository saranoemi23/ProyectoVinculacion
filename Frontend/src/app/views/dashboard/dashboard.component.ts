import { Component, OnInit } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { CommonModule } from "@angular/common";
import axios from 'axios';

const URL = 'http://localhost:3000/matriculas';
const URL_GRADOS = 'http://localhost:3000/grados';

@Component({
  templateUrl: 'dashboard.component.html',
})
export class DashboardComponent {
  grados = [];

  nombre = '';
  idgrado = 0;
  edad = 0;

  
  filtrarNombre = false;
  filtrarGrado = false;
  filtrarEdad = false;

  matriculas = [];

  constructor() {
    this.cargarDatos();
  }

  cargarDatos() {
    axios.get(URL_GRADOS + '/get')
    .then(request => {
      this.grados = request.data;
    })
  }

  cargarMatricula() {

    let filtros = [];

    if (this.filtrarNombre == true) {
      let valor = '%' + this.nombre.trim() + '%'
      filtros.push({ "col": 'm.nombre_alumno', "valor": valor });
    }

    if (this.filtrarGrado == true) {
      filtros.push({ col: 'm.grado', valor: this.idgrado });
    }

    if (this.filtrarEdad == true) {
      filtros.push({ col: 'm.edad', valor: this.edad });
    }

    
    axios.post(URL + '/filter', { filtros: filtros })
      .then((response) => {
        let data = response.data;

        console.log('data', data);

        this.matriculas = data;
      });

  }
}