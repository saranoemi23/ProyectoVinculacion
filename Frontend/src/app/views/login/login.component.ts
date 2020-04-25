import { Component } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JsonPipe } from '@angular/common';
import axios from 'axios';
import { config } from '../../../config';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})

export class LoginComponent { 

loginForm = new FormGroup({
    /*username: new FormControl(''),
    password: new FormControl('')*/
    /*username: new FormControl('', Validators.compose([Validators.required])),
    password: new FormControl('', Validators.compose([Validators.required]))*/
    username: new FormControl('', [Validators.required, Validators.minLength(1)]),
    password: new FormControl('', [Validators.required, Validators.minLength(1)])
  });

  constructor(private router: Router) {
    
  }

  async onSubmit() {
    
   // console.log(this.loginForm.value);

    var data = this.loginForm.value;

    var username = data.username;
    var password = data.password;

    if (username == '' || password == '') {
      alert('Ingrese su usuario y contraseña para continuar.');
      return;
    }

    //console.log("username: " + username + ", password: " + password);

    const instance = axios.create();

    axios.get(config.backendURL() + '/usuarios/get/' + username + '/' + password)
    
    .then(resp => {
 
      //console.log(resp.data);asdasd
      //alert(JSON.stringify(resp.data));
      
     
      if (resp.data.status == 'not found') {
        alert('Usuario/Contraseña incorrecta');
      } else if (resp.data.status == 'ok') {
        alert('Acceso concedido.');
        this.router.navigate(['/dashboard']) 
      }

  })
  .catch(function (error) {
    // handle error
    console.log(error);
    //if (resp.status == 500) {
      if (error) {
      alert('Error al conectarse con el servidor');
      return;
    }
  });


  /*
   console.log("Nombres: "+ req.body.nombres)
    console.log("Apellidos: "+ req.body.apellidos)
    console.log("Identidad: "+ req.body.identidad)
    console.log("Correo: "+ req.body.correo)
    console.log("Direccion: "+ req.body.direccion)
    console.log("Usuario: "+ req.body.usuario)
    console.log("Contraseña: "+ req.body.contraseña)
    console.log("IdRol: "+ req.body.idrol)
  
  */
  
  
  /*axios.post(api + '/add', {

    nombres: 'jefersson alberto',
    apellidos: 'olivera cruz',
    identidad: '1234-1234-12345',
    correo: 'jolivera@unitec.edu',
    direccion: 'san pedro sula',
    usuario: 'jolivera',
    contraseña: 'ceutec',
    idrol: 4

  }).then(resp => {



    console.log(resp.data);

});*/

/*
    axios.get('').then(resp => {
    
        console.log(resp.data);
    });
*/
    //this.router.navigate(['/dashboard']) 
  }

  validate() {

  }

}
