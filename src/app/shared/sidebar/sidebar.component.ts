import { Component, OnInit } from '@angular/core';

// Servicios
import { SidebarService, UsuarioService } from '../../services/service.index';

// Models
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  usuario: Usuario

  constructor( public _sidebar: SidebarService, public _us: UsuarioService ) { }

  ngOnInit() {
    this.usuario = this._us.usuario;
  }

}
