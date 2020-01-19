import { Component } from '@angular/core';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})

export class LoginComponent { 

  loginForm = new FormGroup({
    username: new FormControl('', Validators.compose([Validators.required])),
    password: new FormControl('', Validators.compose([Validators.required]))
  });

  constructor(private router: Router) {
    
  }

  onSubmit(formData: FormGroup) {
    
    console.log(formData);
    this.router.navigate(['/dashboard']) 
  }

}
