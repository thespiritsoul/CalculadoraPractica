import { factorial, percentage, nthRoot } from './mathUtils.js';

export function evaluate(postfix) {
    const stack = [];

    for (let token of postfix) {

        if (token.type === 'number') {
            stack.push(token.value);
            continue;
        }

        let op = token.value;

        // 🔹 NEGATIVO
        if (op === 'NEG') {
            let a = stack.pop();
            if (a === undefined) throw Error("error de formato");
            stack.push(-a);
            continue;
        }

        // 🔹 FACTORIAL
        if (op === '!') {
            let a = stack.pop();
            stack.push(factorial(a));
            continue;
        }

        // 🔹 PORCENTAJE
        if (op === '%') {
            let a = stack.pop();
            stack.push(percentage(a));
            continue;
        }

        // 🔹 RAÍZ CUADRADA
        if (op === 'SQRT') {
            let a = stack.pop();
            if (a === undefined) throw Error("error de formato");
            stack.push(Math.sqrt(a));
            continue;
        }

        // 🔹 RAÍZ N-ÉSIMA
        if (op === 'ROOT') {
            let b = stack.pop();
            let a = stack.pop();
            if (a === undefined || b === undefined) throw Error("error de formato");
            stack.push(nthRoot(a, b));
            continue;
        }

        // 🔹 BINARIOS
        let b = stack.pop();
        let a = stack.pop();

        if (a === undefined || b === undefined) throw Error("error de formato");

        switch (op) {
            case '+': stack.push(a + b); break;
            case '-': stack.push(a - b); break;
            case '*': stack.push(a * b); break;
            case '/':
                if (b === 0) throw Error("error de formato");
                stack.push(a / b);
                break;
            case '^': stack.push(Math.pow(a, b)); break;
            default: throw Error("error de formato");
        }
    }

    if (stack.length !== 1) throw Error("error de formato");

    return stack[0];
}