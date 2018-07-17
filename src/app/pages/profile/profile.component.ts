import { Component, OnInit } from '@angular/core';

// Models
import { Usuario } from '../../models/usuario.model';

// Services
import { UsuarioService } from '../../services/service.index';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario:Usuario;
  imagenSubir:File;
  imagenTemp:string;

  constructor( public _us: UsuarioService ) {
    this.usuario = this._us.usuario;
  }

  ngOnInit() {
  }

  guardar( usuario: Usuario ){
    this.usuario.nombre = usuario.nombre;

    if( !this.usuario.google ){
      this.usuario.email = usuario.email;
    }

    this._us.actualizarUsuario( this.usuario )
          .subscribe();
  }

  
  seleccionImagen( archivo:File ){
    if( archivo === undefined ){
      this.imagenSubir = null;
      return;
    }

    if( archivo.type.indexOf('image') < 0 ){
      this.imagenSubir = null;
      swal('Solo imagenes', 'El archivo seleccionado no es una imagen', 'error');
      return;
    }

    this.imagenSubir = archivo;

    let reader = new FileReader();

    let urlImagenTemp = reader.readAsDataURL( archivo );
    
    reader.onloadend = () => this.imagenTemp = reader.result;
  }


  cambiarImagen(){
    this._us.cambiarImagen( this.imagenSubir, this.usuario._id );
  }

}
