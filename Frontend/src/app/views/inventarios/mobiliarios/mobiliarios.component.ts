import { Component } from '@angular/core';
import axios from 'axios';
import { config } from '../../../../config';
import { DatePipe } from '@angular/common';

const URL = config.backendURL() + '/inventario_mobiliario';

@Component({
  templateUrl: './mobiliarios.component.html',
})
export class MobiliariosComponent {
 
  titulo = 'Inventario Mobiliario';

  id=0;
  cantidad_inicial=0;
  fecha_entrada='';
  descripcion='';
  serie='';
  idestado=0;
  fecha_salida='';
  cantidad_salida=0;
  recibido='';
  destino='';
  observaciones='';
  idbodega=0;
  Entrada=true;
  Salida=false;
  
  mobiliarios=[];

  constructor(private datePipe: DatePipe) { 
    this.nuevo();
    this.cargarDatos();
  }

  cargarDatos() {
    axios.get(URL + '/get')
    .then(request => {
      this.mobiliarios= request.data;
    })
  }
  
  editarDatos(mobiliarios){
    console.log(mobiliarios);
    this.id=mobiliarios.id;
    this.cantidad_inicial=mobiliarios.cantidad_inicial;
    this.fecha_entrada=mobiliarios.fecha_entrada;
    this.descripcion=mobiliarios.descripcion;
    this.serie=mobiliarios.serie;
    this.idestado=mobiliarios.idestado;
    this.fecha_salida=mobiliarios.fecha_salida;
    this.cantidad_salida=mobiliarios.cantidad_salida;
    this.recibido=mobiliarios.recibido;
    this.destino=mobiliarios.destino;
    this.observaciones=mobiliarios.observaciones;
    this.idbodega=mobiliarios.idbodega;
  }

  guardarDatos(){
    let id = this.id;
    let cantidad_inicial = this.cantidad_inicial;
    let fecha_entrada = this.fecha_entrada;
    let descripcion = this.descripcion;
    let serie = this.serie;
    let idestado = this.idestado;
    let fecha_salida = this.fecha_salida;
    let cantidad_salida = this.cantidad_salida;
    let recibido = this.recibido;
    let destino = this.destino;
    let observaciones = this.observaciones;
    let idbodega = this.idbodega;
    
    if (!descripcion){
      alert("Ingrese una descripción.")
      return
    }
    if (!idestado){
      alert("Ingrese estado del mobiliario.")
      return
    }
    if (!idbodega){
      alert("Ingrese la bodega.")
      return
    }
    if (cantidad_salida > cantidad_inicial){
      alert("Las salidas no pueden ser mayor que las entradas.")
      return
    }

    let datos = {
                  id: id,
                  cantidad_inicial: cantidad_inicial,
                  fecha_entrada: fecha_entrada,
                  descripcion: descripcion,
                  serie: serie,
                  idestado: idestado,
                  fecha_salida: fecha_salida,
                  cantidad_salida: cantidad_salida,
                  recibido: recibido,
                  destino: destino,
                  observaciones: observaciones,
                  idbodega: idbodega,
    }
    
    if (id) {
      axios.post(URL + "/edit/" + id, datos) 
      .then(() => this.registroGuardado())
        } else {
      axios.post(URL + "/add", datos)
      .then(() => this.registroGuardado())
    }
  }

  nuevo(){
    let hoy = this.datePipe.transform(Date.now(),'yyyy-MM-dd');

    this.id=0;
    this.cantidad_inicial=0;
    this.descripcion='';
    this.serie='';
    this.idestado=0;
    this.fecha_salida='';
    this.cantidad_salida=0;
    this.recibido='';
    this.destino='';
    this.observaciones='';
    this.idbodega=0;
    this.fecha_entrada=hoy;

  }

  registroGuardado(){
    this.nuevo();
    this.cargarDatos();
    alert('Registro guardado exitosamente');
  }

  eliminar(mobiliarios){
    var respuesta = confirm("Desea eliminar éste registro")
    var id=mobiliarios.id;
    if (!respuesta) return;

    console.log(mobiliarios.id);
    
    axios.delete(URL + "/delete/" + id) 
    .then(() => this.cargarDatos())
  }
  
  seleccionarRegistro(descripcion){

    let registro = this.mobiliarios.find(row => row.descripcion == descripcion);
    this.editarDatos(registro);
  }
}
