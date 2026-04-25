// const DISPLAY = document.getElementById("displayPrincipal")
const SIGNOS_DOS_NUMEROS = ['+','-','*','/','^','√','.']
const SIGNOS_UN_NUMERO = ['%','²√','!']
const SIGNOS = SIGNOS_DOS_NUMEROS.concat(SIGNOS_UN_NUMERO, ['(',')'])
const NUMEROS = "0123456789"


class Operacion {
    constructor(izq, signo, der) {
        this.izq = izq
        this.signo = signo
        this.der = der
    }

    calcular(){
        switch(this.signo){
            case '+': return this.izq + this.der
            case '-': return this.izq - this.der
            case '*': return this.izq * this.der
            case '/': return this.izq / this.der
            case '^': return Math.pow(this.izq, this.der)
            case '√': return Math.pow(this.der, 1/this.izq)
            case '.': return parseFloat(this.izq+"."+this.der)
        }
    }
}




export function operarContenido(contenedor) {
 
    if(contenedor == ""){
        return 0
    }
    if( ! parentesisBalanceados(contenedor) ){
        return "Error de expresion"
    }

    let vectorContenido = vectorizarContenidoEnteros(contenedor)
    console.log(vectorContenido);
    
    if( ! esExpresionCorrecta(contenedor) ){
        return "Error de sintaxis"
    }
    
    if( cantidadSignoDosNumeros(contenedor) === 0){
        return parseInt(contenedor)
    }

    return 1
}

/**FUNCIONES UTILES */
function parentesisBalanceados(cadena) {
    let contador = 0;
    for (let char of cadena) {
        if (char === '(') {
            contador++;
        } else if (char === ')') {
            contador--;
        }
        if (contador < 0) {
            return false;
        }
    }
    return contador === 0;
}

function esNumero(caracter) {
    return NUMEROS.includes(caracter)
}

function vectorizarContenidoEnteros(contenido) {
    let vector = []
    let numeroActual = ""
    for (let char of contenido) {
        if (esNumero(char)) {
            numeroActual += char;
        } else {
            if (numeroActual !== "") {
                vector.push(parseInt(numeroActual));
                numeroActual = "";
            }
            vector.push(char);
        }
    }
    if (numeroActual !== "") {
        vector.push(parseInt(numeroActual));
    }
    return vector;
}
/**FIN DE FUNCIONES UTILES */


function cantidadSignoDosNumeros(contenido) {
    let signos = SIGNOS_DOS_NUMEROS.filter(
        (signo)=>{return contenido.includes(signo) ? signo:null }
    )
    return signos.length
}

/**caracteres que se permiten despues de un signo de dos numeros */
function esCaracterCorrectoInicio(char) {
    return (NUMEROS+"(²").includes(char)
}

function sigueNumeroRaizCuadrada(caracter,sigueSigno2) {
    return !sigueSigno2 && (esNumero(caracter) )
}

function esExpresionCorrecta(contenido) {
    let anteriorFueSigno2 = true /**o vacio */
    let sigueSigno1 = true  /**Para evitar 4%5 o 4!5 */
    let obligadoNumero = false /**activaremos para el . */
    let existePunto = false
    let n = contenido.length
    contenido.forEach(char => {
        if( existePunto && char=="." ){ return false}
        if( obligadoNumero && !esNumero(char) ){return false}
        if( anteriorFueSigno2 && !esCaracterCorrectoInicio(char) ){ return false}
        // if(  ){}  esta complicado
    });

}
