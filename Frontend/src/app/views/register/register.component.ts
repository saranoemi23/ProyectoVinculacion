import { Component } from '@angular/core';
import axios from 'axios';
import { NgForm, FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { config } from '../../../config';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.scss']
})
export class RegisterComponent {

  registerForm = new FormGroup({
    nombres: new FormControl('', [Validators.required, Validators.minLength(1)]),
    apellidos: new FormControl('', [Validators.required, Validators.minLength(1)]),
    direccion: new FormControl('', [Validators.required, Validators.minLength(1)]),
    identidad: new FormControl('', [Validators.required, Validators.minLength(1)]),
    email: new FormControl('', [Validators.required, Validators.minLength(1)]),
    username: new FormControl('', [Validators.required, Validators.minLength(1)]),
    password: new FormControl('', [Validators.required, Validators.minLength(1)]),
    passwordRepeat: new FormControl('', [Validators.required, Validators.minLength(1)]),
    idrol: new FormControl('', [Validators.required, Validators.minLength(1)]),
    secretPassword: new FormControl('', [Validators.required, Validators.minLength(1)]),
  });

  constructor( private router: Router) {

  }

  async onSubmit() {
    
    // console.log(this.loginForm.value);
 
     var data = this.registerForm.value;
 
     var nombres = data.nombres; 
     var apellidos = data.apellidos; 
     var direccion = data.direccion; 
     var email = data.email;
     var id = data.identidad;
     var username = data.username; 
     var password = data.password;
     var passwordRepeat = data.passwordRepeat;
     var idrol = data.idrol;
     var contraseñaAdmin = data.secretPassword;

      if (contraseñaAdmin != 'ceutec') {
        alert('datos incorrectos');
        return;
      }


     if (password != passwordRepeat) {
       alert('contraseñas no coinciden');
       return;
     }
 
 
     const instance = axios.create();
   axios.post(config.backendURL() + '/usuarios/add/', {
 
     nombres: nombres,
     apellidos: apellidos,
     direccion: direccion,
     correo: email,
     identidad: id,
     usuario: username,
     contraseña: password,
     idrol: idrol
 
   }).then(resp => {
  
     console.log(resp.data);
     //alert(resp.data);
     if (resp.data == 'ok') {
       
     alert('usuario registrado con exito');
    this.router.navigate(['/login'])
     }     else {
     alert('error: ' + resp.data);
    }
  });
 
   }


}
