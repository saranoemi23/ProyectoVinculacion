import { Component } from '@angular/core';
import axios from 'axios';

const URL = 'http://localhost:3000/matriculas';
const URL_GRADOS = 'http://localhost:3000/grados';

@Component({
  templateUrl: 'chartjs.component.html'
})
export class ChartJSComponent{

  // lista de grados
  grados = [];

  // valores del form
idmatricula = 0;
fecha_matricula = '';
nombre_alumno = '';
fecha_nacimiento = '';
lugar_nacimiento = '';
edad = 0;
identidad ='';
tipo_sangre = '';
alergias = '';
enfermedades = '';
vacunas = '';
otros = '';
operaciones = '';
fracturas = '';
dif_conducta = '';
grado = '';
tipo_ingreso =  '';
repitente = '';
escuela_ant = '';
nombre_padre = '';
padre_id = '';
padre_edad = 0;
padre_academ = '';
padre_trabajo = '';
padre_trabajo_tel = '';
padre_tel = '';
nombre_madre = '';
madre_id = '';
madre_edad = 0;
madre_academ = '';
madre_trabajo= '';
madre_trabajo_tel= '';
madre_tel = '';
responsable = '';
direccion_resp ='';
tel_resp = '';
familiar = '';
tel_familiar = '';
amigo ='';
tel_amigo = '';
vecino = '';
tel_vecino = '';

  // listado de matriculas
  matriculas = [];


  constructor(){
    this.cargarDatos();
  }

  cargarDatos() {

    axios.get(URL_GRADOS + '/get')
    .then(request => {
      this.grados = request.data;
    })
  }

 //Evento que se ejecuta cuando hacen click en el boton para add
 guardar() {
  let fecha_matricula = this.fecha_matricula ;
  let nombre_alumno = this.nombre_alumno ;
  let fecha_nacimiento = this.fecha_nacimiento ;
  let lugar_nacimiento = this.lugar_nacimiento ;
  let edad = this.edad ;
  let identidad = this.identidad;
  let tipo_sangre = this.tipo_sangre;
  let alergias = this.alergias ;
  let enfermedades = this.enfermedades;
  let vacunas = this.vacunas ;
  let otros = this.otros;
  let operaciones = this.operaciones ;
  let fracturas = this.fracturas;
  let dif_conducta = this.dif_conducta;
  let grado = this.grado ;
  let tipo_ingreso = this.tipo_ingreso;
  let repitente = this.repitente;
  let escuela_ant = this.escuela_ant;
  let nombre_padre = this.nombre_padre ;
  let padre_id = this.padre_id ;
  let padre_edad = this.padre_edad ;
  let padre_academ = this.padre_academ ;
  let padre_trabajo = this.padre_trabajo ;
  let padre_trabajo_tel = this.padre_trabajo_tel ;
  let padre_tel = this.padre_tel;
  let nombre_madre = this.nombre_madre ;
  let madre_id = this.madre_id ;
  let madre_edad = this.madre_edad ;
  let madre_academ = this.madre_academ ;
  let madre_trabajo= this.madre_trabajo ;
  let madre_trabajo_tel= this.madre_trabajo_tel ;
  let madre_tel = this.madre_tel ;
  let responsable = this.responsable ;
  let direccion_resp = this.direccion_resp ;
  let tel_resp = this.tel_resp;
  let familiar = this.familiar;
  let tel_familiar = this.tel_familiar ;
  let amigo = this.amigo ;
  let tel_amigo = this.tel_amigo ;
  let vecino = this.vecino ;
  let tel_vecino = this.tel_vecino; 

  if (nombre_alumno == '' && fecha_nacimiento == '' && lugar_nacimiento =='' && edad == 0 && identidad == '' && tipo_sangre == '' && alergias == '' && enfermedades == '' && vacunas == '' && otros == '' && operaciones == '' && fracturas == '' && dif_conducta == '' && grado == '' && tipo_ingreso == '' && repitente == '' && escuela_ant == '' && nombre_padre == '' && padre_id == '' && padre_edad == 0 && padre_academ == '' && padre_trabajo == '' && padre_trabajo_tel == '' && padre_tel == '' && nombre_madre == '' && madre_id == '' && madre_edad == 0 && madre_academ == '' && madre_trabajo == '' && madre_trabajo_tel == '' && madre_tel == '' && responsable == '' && direccion_resp == '' && tel_resp == '' && familiar == '' && tel_familiar == '' && amigo == '' && tel_amigo == '' && vecino == '' && tel_vecino == '') {
    return alert('Agregue todos los datos para guardar');
  }
  
  if (this.idmatricula == 0) {
    this.agregarNueva();
  } else {
    this.editarMatricula();
  }
}

agregarNueva() {

  let fecha_matricula = this.fecha_matricula ;
  let nombre_alumno = this.nombre_alumno ;
  let fecha_nacimiento = this.fecha_nacimiento ;
  let lugar_nacimiento = this.lugar_nacimiento ;
  let edad = this.edad ;
  let identidad = this.identidad;
  let tipo_sangre = this.tipo_sangre;
  let alergias = this.alergias ;
  let enfermedades = this.enfermedades;
  let vacunas = this.vacunas ;
  let otros = this.otros;
  let operaciones = this.operaciones ;
  let fracturas = this.fracturas;
  let dif_conducta = this.dif_conducta;
  let grado = this.grado ;
  let tipo_ingreso = this.tipo_ingreso;
  let repitente = this.repitente;
  let escuela_ant = this.escuela_ant;
  let nombre_padre = this.nombre_padre ;
  let padre_id = this.padre_id ;
  let padre_edad = this.padre_edad ;
  let padre_academ = this.padre_academ ;
  let padre_trabajo = this.padre_trabajo ;
  let padre_trabajo_tel = this.padre_trabajo_tel ;
  let padre_tel = this.padre_tel;
  let nombre_madre = this.nombre_madre ;
  let madre_id = this.madre_id ;
  let madre_edad = this.madre_edad ;
  let madre_academ = this.madre_academ ;
  let madre_trabajo= this.madre_trabajo ;
  let madre_trabajo_tel= this.madre_trabajo_tel ;
  let madre_tel = this.madre_tel ;
  let responsable = this.responsable ;
  let direccion_resp = this.direccion_resp ;
  let tel_resp = this.tel_resp;
  let familiar = this.familiar;
  let tel_familiar = this.tel_familiar ;
  let amigo = this.amigo ;
  let tel_amigo = this.tel_amigo ;
  let vecino = this.vecino ;
  let tel_vecino = this.tel_vecino; 

  //Llama el api y agrega los datos
  axios.post(URL + '/add', {
    fecha_matricula : fecha_matricula,
    nombre_alumno : nombre_alumno,
    fecha_nacimiento : fecha_nacimiento,
    lugar_nacimiento : lugar_nacimiento,
    edad : edad,
    identidad :identidad,
    tipo_sangre : tipo_sangre,
    alergias : alergias,
    enfermedades : enfermedades,
    vacunas : vacunas,
    operaciones : operaciones,
    fracturas : fracturas,
    dif_conducta : dif_conducta,
    grado : grado,
    tipo_ingreso :  tipo_ingreso,
    repitente : repitente,
    escuela_ant : escuela_ant,
    nombre_padre : nombre_padre,
    padre_id : padre_id,
    padre_edad : padre_edad,
    padre_academ : padre_academ,
    padre_trabajo : padre_trabajo,
    padre_trabajo_tel : padre_trabajo_tel,
    padre_tel : padre_tel,
    nombre_madre : nombre_madre,
    madre_id : madre_id,
    madre_edad : madre_edad,
    madre_academ : madre_academ,
    madre_trabajo : madre_trabajo,
    madre_trabajo_tel: madre_trabajo_tel,
    madre_tel :madre_tel,
    responsable : responsable,
    direccion_resp :direccion_resp,
    tel_resp : tel_resp,
    familiar : familiar,
    tel_familiar : tel_familiar,
    amigo :amigo,
    tel_amigo : tel_amigo,
    vecino : vecino,
    tel_vecino : tel_vecino
    })

    // despues de guardar los datos
    .then(() => {
      // se actualiza la lista de asignaturas
      this.cargarDatos();
      this.limpiarForm();
    })

}

editarMatricula() {

  let idmatricula = this.idmatricula;
  let fecha_matricula = this.fecha_matricula ;
  let nombre_alumno = this.nombre_alumno ;
  let fecha_nacimiento = this.fecha_nacimiento ;
  let lugar_nacimiento = this.lugar_nacimiento ;
  let edad = this.edad ;
  let identidad = this.identidad;
  let tipo_sangre = this.tipo_sangre;
  let alergias = this.alergias ;
  let enfermedades = this.enfermedades;
  let vacunas = this.vacunas ;
  let otros = this.otros;
  let operaciones = this.operaciones ;
  let fracturas = this.fracturas;
  let dif_conducta = this.dif_conducta;
  let grado = this.grado ;
  let tipo_ingreso = this.tipo_ingreso;
  let repitente = this.repitente;
  let escuela_ant = this.escuela_ant;
  let nombre_padre = this.nombre_padre ;
  let padre_id = this.padre_id ;
  let padre_edad = this.padre_edad ;
  let padre_academ = this.padre_academ ;
  let padre_trabajo = this.padre_trabajo ;
  let padre_trabajo_tel = this.padre_trabajo_tel ;
  let padre_tel = this.padre_tel;
  let nombre_madre = this.nombre_madre ;
  let madre_id = this.madre_id ;
  let madre_edad = this.madre_edad ;
  let madre_academ = this.madre_academ ;
  let madre_trabajo= this.madre_trabajo ;
  let madre_trabajo_tel= this.madre_trabajo_tel ;
  let madre_tel = this.madre_tel ;
  let responsable = this.responsable ;
  let direccion_resp = this.direccion_resp ;
  let tel_resp = this.tel_resp;
  let familiar = this.familiar;
  let tel_familiar = this.tel_familiar ;
  let amigo = this.amigo ;
  let tel_amigo = this.tel_amigo ;
  let vecino = this.vecino ;
  let tel_vecino = this.tel_vecino; 

  //Llama el api y agrega los datos
  axios.put(URL + '/edit/' + idmatricula, {
    fecha_matricula : '',
    nombre_alumno : '',
    fecha_nacimiento : '',
    lugar_nacimiento : '',
    edad : 0,
    identidad :'',
    tipo_sangre : '',
    alergias : '',
    enfermedades : '',
    vacunas : '',
    operaciones : '',
    fracturas : '',
    dif_conducta : '',
    grado : '',
    tipo_ingreso :  '',
    repitente : '',
    escuela_ant : '',
    nombre_padre : '',
    padre_id : '',
    padre_edad : 0,
    padre_academ : '',
    padre_trabajo : '',
    padre_trabajo_tel : '',
    padre_tel : '',
    nombre_madre : '',
    madre_id : '',
    madre_edad : 0,
    madre_academ : '',
    madre_trabajo : '',
    madre_trabajo_tel: '',
    madre_tel : '',
    responsable : '',
    direccion_resp :'',
    tel_resp : '',
    familiar : '',
    tel_familiar : '',
    amigo :'',
    tel_amigo : '',
    vecino : '',
    tel_vecino : ''
    })

    // despues de guardar los datos
    .then(() => {
      // se actualiza la lista de asignaturas
      this.cargarDatos();
      this.limpiarForm();
    })

}

eliminarAsignatura(matricula) {

  if (!confirm('Desea eliminar la asignatura?')) {
    return;
  }

  let id = matricula.idmatricula;

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
  this.idmatricula = 0;
  this.fecha_matricula = '';
  this.nombre_alumno = '';
  this.fecha_nacimiento = '';
  this.lugar_nacimiento = '';
  this.edad = 0;
  this.identidad ='';
  this.tipo_sangre = '';
  this.alergias = '';
  this.enfermedades = '';
  this.vacunas = '';
  this.otros = '';
  this.operaciones = '';
  this.fracturas = '';
  this.dif_conducta = '';
  this.grado = '';
  this.tipo_ingreso =  '';
  this.repitente = '';
  this.escuela_ant = '';
  this.nombre_padre = '';
  this.padre_id = '';
  this.padre_edad = 0;
  this.padre_academ = '';
  this.padre_trabajo = '';
  this.padre_trabajo_tel = '';
  this.padre_tel = '';
  this.nombre_madre = '';
  this.madre_id = '';
  this.madre_edad = 0;
  this.madre_academ = '';
  this.madre_trabajo= '';
  this.madre_trabajo_tel= '';
  this.madre_tel = '';
  this.responsable = '';
  this.direccion_resp ='';
  this.tel_resp = '';
  this.familiar = '';
  this.tel_familiar = '';
  this.amigo ='';
  this.tel_amigo = '';
  this.vecino = '';
  this.tel_vecino = '';
}

seleccionarAsignatura(m) {
  this.idmatricula = m.idmatricula;
  this.fecha_matricula = m.fecha_matricula;
  this.nombre_alumno = m.nombre_alumno;
  this.fecha_nacimiento = m.fecha_nacimiento;
  this.lugar_nacimiento = m.lugar_nacimiento;
  this.edad = m.edad;
  this.identidad =m.identidad;
  this.tipo_sangre = m.tipo_sangre;
  this.alergias = m.alergias;
  this.enfermedades = m.enfermedades;
  this.vacunas = m.vacunas;
  this.otros = m.otros;
  this.operaciones = m.operaciones;
  this.fracturas = m.fracturas;
  this.dif_conducta = m.dif_conducta;
  this.grado = m.grado;
  this.tipo_ingreso =  m.tipo_ingreso;
  this.repitente = m.repitente;
  this.escuela_ant = m.escuela_ant;
  this.nombre_padre = m.nombre_padre;
  this.padre_id = m.padre_id;
  this.padre_edad = m.padre_edad;
  this.padre_academ = m.padre_academ;
  this.padre_trabajo = m.padre_trabajo;
  this.padre_trabajo_tel = m.padre_trabajo_tel;
  this.padre_tel = m.padre_tel;
  this.nombre_madre = m.nombre_madre;
  this.madre_id = m.madre_id;
  this.madre_edad = m.madre_edad;
  this.madre_academ = m.madre_academ;
  this.madre_trabajo= m.madre_trabajo;
  this.madre_trabajo_tel= m.madre_trabajo_tel;
  this.madre_tel = m.madre_tel;
  this.responsable = m.responsable;
  this.direccion_resp =m.direccion_resp;
  this.tel_resp = m.tel_resp;
  this.familiar = m.familiar;
  this.tel_familiar = m.tel_familiar;
  this.amigo =m.amigo;
  this.tel_amigo = m.tel_amigo;
  this.vecino = m.vecino;
  this.tel_vecino = m.tel_vecino;
}

}
