import { Component } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JsonPipe } from '@angular/common';
import axios from 'axios';

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


    //console.log("username: " + username + ", password: " + password);

    const instance = axios.create();

    axios.get('http://localhost:3000/usuarios/get/?usuario=' + username + '&clave=' + password).then(resp => {

      //console.log(resp.data);
      alert(JSON.stringify(resp.data));

      if (resp.status == 500) {
        alert('Usuario/Contraseña incorrecta');
      } else if (resp.data.status == 'ok') {
        alert('Acceso concedido.');
        this.router.navigate(['/dashboard']) 
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
