import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img:string, tipo:string = 'usuario'): any {
    let url = URL_SERVICIOS + '/img';

    // Si no viene ninguna imagen
    if( !img ){
      return url + '/usuarios/xxx';
    }

    // Si es una imagen de google user
    if( img.indexOf('https') >= 0 ){
      return img;
    }

    // Si es una imagen de nuestro backend
    switch( tipo ){
      case 'usuario':
        url += '/usuarios/' + img;
      break;

      case 'medico':
        url += '/medicos/' + img;
      break;

      case 'hospital':
        url += '/hospitales/' + img;
      break;

      default:
        console.log('Tipo de imagen no existe, usuarios, medicos, hospitales');
        url += '/usuarios/xxx';
      break;
    }
    
    return url;
  }

}
