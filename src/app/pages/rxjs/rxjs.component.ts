import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscripcion: Subscription;

  constructor(){

    this.subscripcion = this.regresaObservable()
    .subscribe( 
      numero => console.log('Subs: ', numero), // lo que retorna
      error => console.error("Error: ", error), // el error
      () => console.log("El observador termino") // cuando termina
    );

  }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.subscripcion.unsubscribe();
  }

  regresaObservable():Observable<any>{
    return new Observable( (observer: Subscriber<any>) => {
      
      let contador = 0;

      let intervalo = setInterval( () => {
        contador++;

        const salida = {
          valor: contador
        }

        observer.next( salida ); // recibe el contador y continua

        // if( contador === 3 ){
        //   clearInterval(intervalo);
        //   observer.complete(); // se cierra el objservable
        // }

        // if( contador === 2 ){
        //   //clearInterval(intervalo);
        //   observer.error('Auxilio'); // error del observable
        // }

      }, 1000);
    }).pipe(
      map( resp => resp.valor ),
      filter( (valor, index) => {
        if( (valor % 2) === 1 ){ // impar
          return true;
        }else { // par
          return false;
        }
      })
    );
  }

}
