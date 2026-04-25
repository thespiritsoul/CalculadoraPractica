// import { operarContenido } from "./botones.js";
import {calculate} from "./logica/index.js"

const DISPLAY = document.getElementById("displayPrincipal")
const CURSOR = `<div class="cursor"></div>`
const LEN_CURSOR = CURSOR.length


let resultado = 0
let posicion = 0
let ANSvalor = 0
let estadoError = false
function botonClick(caracter) {
    var elemento;
    var posi;
    if(estadoError){
        DISPLAY.innerHTML = CURSOR
        posicion = 0
        estadoError = false
    }
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
        case '%':      
        case '.':       
            elemento = caracter
            posi = 1
            break;
        case 'ANS':
            elemento = 'ANS'
            posi = 3
            break;   
        case 'pIzq':
            elemento = '('
            posi = 1
            break;
        case 'pDer':
            elemento = ')'
            posi = 1
            break;
        case 'cua':
            elemento = '2&radic;'
            posi = 2
            break;
        case 'sqrt':
            elemento = '&radic;'
            posi = 1
            break;
        case 'izq':
            moverCursor("izq")
            break;
        case 'der':
            moverCursor("der")
            break;
        case 'CE':
            eliminarElemeto()
            break;
        case 'Clear':
            DISPLAY.innerHTML = CURSOR
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
    var contenido = contenidoDisplaySinCursor()
    var n = contenido.length
    var izq = contenido.substring(0,posicion)
    var der = contenido.substring(posicion,n)
    posicion += posi
    DISPLAY.innerHTML = izq + elemento + CURSOR + der
}
/**
 * modifica la posision, variable global
 * modifica el texto de DISPLAY
 */
function moverCursor(dire) {
    var contenido = contenidoDisplaySinCursor()
    var n = contenido.length
    var izq = invertirCadena(contenido.substring(0,posicion))
    var der = contenido.substring(posicion,n)
    var nuevaPosi;
    console.log(`izq : ${invertirCadena(izq)}    der : ${der}`);
    if(dire == "izq"){
        if(izq == ""){
            return
        }
        if( izq.search("SNA") == 0){
            nuevaPosi = 3
        }else{
            nuevaPosi = 1
        }
        der = invertirCadena(izq.substring(0,nuevaPosi)) + der
        izq = izq.substring(nuevaPosi,izq.length)
    }else{
        if(der == ""){
            return
        }
        if( der.search("ANS") == 0){
            nuevaPosi = 3
        }else{
            nuevaPosi = 1
        }
        izq = invertirCadena(der.substring(0,nuevaPosi)) + izq
        der = der.substring(nuevaPosi,der.length)
    }
    if (dire == "izq") {
        posicion -= nuevaPosi
    }else{
        posicion += nuevaPosi
    }
    console.log(`${nuevaPosi}    ${posicion}`);
    console.log(`izq : ${invertirCadena(izq)}    der : ${der}`);
    
    DISPLAY.innerHTML = invertirCadena(izq) + CURSOR + der
}

function eliminarElemeto() {
    let contenido = contenidoDisplaySinCursor()
    let n = contenido.length
    let cadEli = contenido.substring(0,posicion)
    let cadRes = contenido.substring(posicion,n)
    let operando = invertirCadena(cadEli)

    if (cadEli == "") {
        return
    }
    if( operando.search("SNA") == 0){ 
        operando = operando.replace('SNA',"")
        posicion -= 3
    }else{
        operando = operando.substring(1,n)
        posicion -= 1
    }
    /**aqui retorno directo al display */
    DISPLAY.innerHTML = invertirCadena(operando)+CURSOR+cadRes
}

function invertirCadena(cadena){
    let x = ""
    for( let i=0; i<cadena.length ; i++){
        x = cadena.substring(i,i+1) + x
    }
    return x
}


function mostrarResultado() {
    let contenido = contenidoDisplaySinCursor()
    let n = contenido.length
    if (contenido == "") {
        return
    }  
    if(contenido.search("ANS") != -1){
        contenido = contenido.replaceAll("ANS",ANSvalor)
    }

    /** en logica/index.js
     * esta toda la logica del ChatGPT, logica muy dificil
     * me llevaria años entenderlo jaja
     */
    resultado = calculate(contenido)

    if(resultado == "error de formato" || resultado == "Big number"){
        DISPLAY.innerHTML = resultado
        posicion = 0
        ANSvalor = 0
        guardarHistorial(contenido,String(resultado))
        estadoError = true
        return
    }
    ANSvalor = resultado
    posicion = String(resultado).length
    guardarHistorial(contenido,resultado)
    DISPLAY.innerHTML = resultado + CURSOR
}

function guardarHistorial(operaciones, respuesta) {
    const CONTENEDOR_HISTORIAL = document.getElementById("containerHistorial")

    /** enviar con '', para que el texto '1+2+3' no me lo opere */
    let operacion =`<button onclick="botonHistorial('${operaciones}')">
                        <div class="display">${operaciones}</div>
                    </button>`
    let res;
    if (respuesta == "error de formato" || respuesta == "Big number") {
        res = `<div class="display">${respuesta}</div>`
    }else{
        res =  `<button onclick="botonHistorial('${respuesta}')">
                    <div class="display">${respuesta}</div>
                </button>`
    }

    CONTENEDOR_HISTORIAL.innerHTML = CONTENEDOR_HISTORIAL.innerHTML +`<li>${operacion}${res}</li>`
    CONTENEDOR_HISTORIAL.scrollTop = CONTENEDOR_HISTORIAL.scrollHeight
    
}

function botonHistorial(texto) {
    if(estadoError){
        estadoError = false
    }
    posicion = texto.length
    DISPLAY.innerHTML = texto + CURSOR
}

function contenidoDisplaySinCursor(){
    return DISPLAY.innerHTML.replace(CURSOR,'')
}

/**primero dividire los botones que mantengan el resultado */

window.botonClick = botonClick;/** temporal, talvez cambie a addEventListener */
window.botonHistorial = botonHistorial;