import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

// Services
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor( public _us: UsuarioService, public router: Router ){}

  canActivate(){
    if( this._us.estaLogueado() ){
      console.log('PASO EL GUARD');
      return true;
    }else{
      console.error('BLOQUEADO POR EL GUARD');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
