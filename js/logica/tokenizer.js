export function tokenize(expr) {
    const tokens = [];
    let i = 0;

    while (i < expr.length) {
        let c = expr[i];

        // número
        if (/\d|\./.test(c)) {
            let num = c;
            i++;
            while (i < expr.length && /[\d.]/.test(expr[i])) {
                num += expr[i++];
            }
            tokens.push({ type: 'number', value: parseFloat(num) });
            continue;
        }

        // operadores
        if ("+-*/^()!%√".includes(c)) {
            tokens.push({ type: 'op', value: c });
            i++;
            continue;
        }

        throw Error("error de formato");
    }

    return tokens;
}