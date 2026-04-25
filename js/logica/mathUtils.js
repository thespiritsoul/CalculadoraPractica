export function factorial(n) {
    if (n < 0 || !Number.isInteger(n)) throw Error("error de formato");
    let res = 1;
    for (let i = 2; i <= n; i++) res *= i;
    return res;
}

export function percentage(x) {
    return x / 100;
}

export function nthRoot(n, x) {
    if (n === 0) throw Error("error de formato");
    return Math.pow(x, 1 / n);
}

export function formatResult(x) {
    if (!isFinite(x)) throw Error("error de formato");

    // 🔴 límite superior
    if (Math.abs(x) > 1e20) {
        return "Big number";
    }

    // redondeo a 8 decimales
    let rounded = Math.round(x * 1e8) / 1e8;

    // evitar -0
    if (Object.is(rounded, -0)) rounded = 0;

    let str = rounded.toFixed(8);

    // quitar ceros innecesarios
    str = str.replace(/\.?0+$/, '');

    return str;
}