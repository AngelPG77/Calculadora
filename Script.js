const mostrarValorAnterior = document.getElementById("valor_anterior");
const mostrarValorActual = document.getElementById("valor_actual");
const botonesNumeros = document.querySelectorAll(".tipoNum");
const botonesOperadores = document.querySelectorAll(".operador");

// Clase Calculadora

class Calculadora {

    sumar(num1, num2){
        return num1 + num2;
    }

    restar(num1, num2){
        return num1 - num2;
    }

    multiplicar(num1, num2){
        return num1 * num2;
    }

    dividir(num1, num2){
        if (num2 === 0) {
            throw new Error("No se puede dividir por cero");
        }
        return num1 / num2;
    }

}


// Clase Pantalla

class Pantalla {
    constructor(mostrarValorAnterior, mostrarValorActual) {
        this.mostrarValorAnterior = mostrarValorAnterior;
        this.mostrarValorActual = mostrarValorActual;
        this.calculadora = new Calculadora();
        this.operador = undefined;
        this.valorActual = "";
        this.valorAnterior = "";
        this.signos = {
            sumar: "+",
            restar: "-",
            multiplicar: "*",
            dividir: "/"
        }
    }

    agregarNumero(numero) {
        if (numero === "." && this.valorActual.includes(".")) {
            return; 
        }
        this.valorActual = this.valorActual.toString() + numero.toString();
        this.actualizarPantalla();
    }

    actualizarPantalla() {
        this.mostrarValorActual.textContent = this.valorActual;
        this.mostrarValorAnterior.textContent = `${this.valorAnterior} ${this.signos[this.operador] || ""}`;
    }

    limpiarPantalla() {
        this.valorActual = "";
        this.valorAnterior = "";
        this.operador = undefined;
        this.actualizarPantalla();
    }

    hacerOperacion(){
        const valorAnterior = parseFloat(this.valorAnterior);
        const valorActual = parseFloat(this.valorActual);
        if (isNaN(valorAnterior) || isNaN(valorActual)) return;
        this.valorActual = this.calculadora[this.operador](valorAnterior, valorActual);
    }

    setOperador(tipoOperador){
        if (this.operador !== "igual") {
            this.hacerOperacion();
        }
        this.operador = tipoOperador;
        this.valorAnterior = this.valorActual || this.valorAnterior;
        this.valorActual = "";
        this.actualizarPantalla();
    }
}


const pantalla = new Pantalla(mostrarValorAnterior, mostrarValorActual);


botonesNumeros.forEach(boton => {
    boton.addEventListener("click", () => {
        pantalla.agregarNumero(boton.innerHTML);
    });
});

botonesOperadores.forEach(boton => {
    boton.addEventListener("click", () => {
        pantalla.setOperador(boton.value);
    });
});

