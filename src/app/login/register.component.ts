import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Services
import { UsuarioService } from '../services/service.index';

// Models
import { Usuario } from '../models/usuario.model';

// Plugins
import swal from 'sweetalert';



declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma:FormGroup

  constructor( public _us: UsuarioService, public router: Router ) {}

  sonIguales(campo1:string, campo2:string){
    return (group: FormGroup) => {
      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;

      if( pass1 === pass2 ){
        return null;
      }

      return {
        sonIguales: true
      }
    }
  }

  ngOnInit(){
    init_plugins();

    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      correo: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      condiciones: new FormControl(false)
    }, { validators: this.sonIguales('password', 'password2')});
  }

  registrarUsuario(){

    if( this.forma.invalid ) return;

    if( !this.forma.value.condiciones ){
      swal("Importante", "Debe aceptar las condiciones", "warning");
      return;
    }

    let usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.correo,
      this.forma.value.password
    );

    this._us.crearUsuario(usuario)
          .subscribe( resp => this.router.navigate(['/login']) );
  }

}
