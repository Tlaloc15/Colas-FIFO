class Proceso {
            constructor() {
                this._cantidadTareas;
            }
            get cantidadTareas() {
                return this._cantidadTareas;
            }
        }

        class Probabilidades {
            constructor() {
            }
            get probNuevoProc() {
                let probabilidad = Math.trunc(Math.random() * 100 + 1);

                if(probabilidad <= 39) {
                    probabilidad = 1;
                }
                return probabilidad;
            }
            get cantidadTareas() {
                let cantidad = Math.trunc(Math.random() * 10 + 4);
                return cantidad;
            }
        }
class Administracion {
    constructor(tabla)  {
        this._tabla = tabla;
        this._contador = 300;
        this._listaProcesos;
        this.sumador = 0;
        this.contadorEspera = 0;
        this.contadorvacio = 0;
        this.contadorTerminados = 0;
    }
    
    iniciar() {   
        this._listaProcesos = new Proceso();
    
        let aux = this._listaProcesos;
        let aux2 = this._listaProcesos;
    
        let probabilidad = new Probabilidades();
    
        for(var i = 0; i < 300; i++) {
            console.log("Ciclo: "+ (i+1));
            if(i === 0) {
                aux._cantidadTareas = probabilidad.cantidadTareas;
                this.sumador = this.sumador + aux._cantidadTareas;
            }
            if(probabilidad.probNuevoProc === 1) {
                this.contadorEspera++;
                aux._siguiente = new Proceso();
                aux._siguiente._cantidadTareas = probabilidad.cantidadTareas;
                this.sumador = this.sumador + aux._cantidadTareas;
                console.log("nuevo proceso agregado tiene: " + aux._cantidadTareas + " Tareas");
                aux = aux._siguiente;
            }
            if(aux2._cantidadTareas <= 0 && this.contadorEspera >= 1) {
                this.contadorTerminados++;
                aux2 = aux2._siguiente;
                this.contadorEspera--;
            }
            if(aux2._cantidadTareas <= 0 && this.contadorEspera === 0) {
                this.contadorvacio++;
            }
            this.proceso(aux2);
        }
    }
    proceso(aux2) {
        this.impresion(aux2)
        this.sumador = this.sumador -1;
        aux2._cantidadTareas = aux2._cantidadTareas-1;
    }
    impresion(aux2) 
    {
        console.log("cantidad de tareas restantes: " + aux2._cantidadTareas);
        console.log("Procesos en cola: " + this.contadorEspera + " Suma de tareas totales faltantes: " + this.sumador);
        console.log("Cantidad de veces que ha estado vacio: " + this.contadorvacio);
        console.log("Procesos completados: " + this.contadorTerminados);
    }
}
var ejecutar = new Administracion(document.querySelector('#tablaEjecutar'));
document.querySelector('#iniciar').addEventListener('click', () => {
    ejecutar.iniciar();
});