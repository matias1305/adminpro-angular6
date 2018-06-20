import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-promesas",
  templateUrl: "./promesas.component.html",
  styles: []
})
export class PromesasComponent implements OnInit {
  constructor() {

    
    // Viendo las respuestas de la promesa
    this.contarTres()
      .then(() => console.log("termino")) // Ejecucion correcta (resolve)
      .catch(error => console.error(error)); // Error (reject)
  }

  ngOnInit() {}


  contarTres():Promise<boolean>{
    // Creando la promesa
    return new Promise( (resolve, reject) => {
      let contador = 0;

      // Intervalo para simular la promesa
      let intervalo = setInterval(() => {
        contador++;
        console.log(contador);

        if (contador === 3) {
          resolve(true);
          clearInterval(intervalo);
        }
      }, 1000);
    });
  }


  
}
