import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { URL_SERVICIOS } from '../../config/config';

// Models
import { Usuario } from '../../models/usuario.model';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

// Services
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario:Usuario;
  token:string;

  constructor( public http: HttpClient, public router: Router, public _subirArchivo: SubirArchivoService ) {
    this.cargarStorage();
  }

  estaLogueado(){
    return (this.token.length > 5) ? true : false;
  }

  guardarStorage( id:string, token:string, usuario:Usuario ){
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }

  cargarStorage(){
    if( localStorage.getItem('token') ){
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse( localStorage.getItem('usuario') );
    }else{
      this.token = '';
      this.usuario = null;
    }
  }

  loginGoogle( token:string ){
    let url = URL_SERVICIOS + '/login/google';

    return this.http.post(url, { token }).pipe(
      map( (resp:any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario);
        return true;
      })
    );
  }

  login( usuario:Usuario, recordar:boolean = false ){
    let url = URL_SERVICIOS + '/login';
    return this.http.post(url, usuario).pipe(
      map( (resp:any) => {

        if( recordar ){
          localStorage.setItem('email', usuario.email);
        }else{
          localStorage.removeItem('email');
        }
        this.guardarStorage(resp.id, resp.token, resp.usuario);
        return true;
      })
    )
  }

  logout(){
    this.token = '';
    this.usuario = null;

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('id');

    this.router.navigate(['/login']);
  }

  crearUsuario( usuario:Usuario ){
    let url = URL_SERVICIOS + '/usuario';
    return this.http.post(url, usuario).pipe(
      map( (resp:any) => {
        swal('Usuario creado', usuario.email, 'success');
        return resp.usuario;
      })
    );
  }


  actualizarUsuario( usuario: Usuario ){
    let url = URL_SERVICIOS +'/usuario/'+ this.usuario._id;
    url += '?token='+ this.token;
    console.log(url);
    return this.http.put(url, usuario).pipe(
      map( (resp:any) => {
        this.guardarStorage(resp.usuario._id, this.token, resp.usuario);
        swal('Usuario actualizado', usuario.nombre, 'success');
        return true;
      })
    );
  }


  cambiarImagen( archivo:File, id:string ){
    this._subirArchivo.subirArchivo( archivo, 'usuarios', id )
            .then( (resp:any) => {
              this.usuario.img = resp.usuario.img;
              swal('Imagen actualizada', this.usuario.nombre, 'success');

              this.guardarStorage(id, this.token, this.usuario);
            })
            .catch( e => console.log(e) )
  }
}
