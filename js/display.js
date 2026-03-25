// import { botonClick } from "./botones.js";

const DISPLAY = document.getElementById("displayPrincipal")

let resultado = 0
let posicion = 0
let ANStext = ""
function botonClick(caracter) {
    let elemento;
    switch (caracter) {
        case '1':       
        case '2':       
        case '3':       
        case '4':       
        case '5':       
        case '6':       
        case '7':       
        case '8':       
        case '9':       
        case '0':       
        case '^':       
        case '!':       
        case '+':       
        case '-':       
        case '*':       
        case '/':       
        case '.':       
            elemento = caracter
            posicion += 1
            break;
        case 'ANS':
            elemento = 'ANS'
            posicion += 3
            break;   
        case 'pIzq':
            elemento = '('
            posicion += 1
            break;
        case 'pDer':
            elemento = ')'
            posicion += 1
            break;
        case 'cua':
            elemento = '&#178;&radic;'
            posicion += 2
            break;
        case 'sqrt':
            elemento = '&radic;'
            posicion += 1
            break;
        case 'izq':     break;/** aun no  */
        case 'der':     break;/** aun no  */
        case 'CE':
            eliminarElemeto()
            break;
        case 'Clear':
            DISPLAY.innerHTML = ""
            posicion = 0
            break;
        case '=':
            mostrarResultado()
            break;
        default:        break;
    }

    if (elemento == undefined) {
        return
    }
    /*este es lo que muestra al display*/
    DISPLAY.innerHTML = DISPLAY.innerHTML + elemento
    console.log(DISPLAY.innerHTML);
    console.log(posicion);
    
}

function eliminarElemeto() {
    if (DISPLAY.innerHTML == "") {
        return
    }
    let n = DISPLAY.innerHTML.length
    let cadEli = DISPLAY.innerHTML.substring(0,posicion)
    let cadRes = DISPLAY.innerHTML.substring(posicion,n)
    let operando = invertirCadena(cadEli)
    if( operando.search("SNA") == 0){ 
        operando = operando.replace('SNA',"")
        posicion -= 3
    }else if(operando.search("√²") == 0){
        operando = operando.replace('√²',"")
        posicion -= 2
    }else{
        operando = operando.substring(1,n)
        posicion -= 1
    }
    console.log(posicion);
    /**aqui retorno directo al display */
    DISPLAY.innerHTML = invertirCadena(operando)+cadRes
}

function invertirCadena(cadena){
    x = ""
    for( i=0; i<cadena.length ; i++){
        x = cadena.substring(i,i+1) + x
    }
    return x
}

`{[(1)]}`

function mostrarResultado() {
    if (DISPLAY.innerHTML == "") {
        return
    }

    /*TODO: hay que agregar los casos de error aqui, para que ANS no guarde errores */

    if(DISPLAY.innerHTML.search("ANS") != -1){
        DISPLAY.innerHTML = DISPLAY.innerHTML.replaceAll("ANS",ANStext)
    }

    /**TODO: este deberia cambiar, debe operar para el resultado
     * De momento el resultado sera el mismo contenido de DISPLAY
     */
    resultado = DISPLAY.innerHTML
    ANStext = resultado
    guardarHistorial(DISPLAY.innerHTML,resultado)
    DISPLAY.innerHTML = resultado
    console.log("    "+DISPLAY.innerHTML.search("ANS") != -1);
    
}

function guardarHistorial(operaciones, respuesta) {
    const CONTENEDOR_HISTORIAL = document.getElementById("containerHistorial")
    CONTENEDOR_HISTORIAL.innerHTML = CONTENEDOR_HISTORIAL.innerHTML +
                `<li>
                    <div class="display">${operaciones}</div>
                    <div class="display">${respuesta}</div>
                </li>`
}