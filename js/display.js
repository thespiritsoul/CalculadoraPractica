// import { botonClick } from "./botones.js";

const DISPLAY = document.getElementById("displayPrincipal")

let resultado = 0
let posicion = 0

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
        case 'Clear':   break;
        case '=':       break;
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
    DISPLAY.innerHTML = invertirCadena(operando)+cadRes
}

function invertirCadena(cadena){
    x = ""
    for( i=0; i<cadena.length ; i++){
        x = cadena.substring(i,i+1) + x
    }
    return x
}