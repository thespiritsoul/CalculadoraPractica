export function normalize(expr) {
    // eliminar espacios
    expr = expr.replace(/\s+/g, '');

    // .5 → 0.5
    expr = expr.replace(/(^|[^0-9])\.(\d+)/g, '$10.$2');

    // multiplicación implícita
    expr = expr
        .replace(/(\d)\(/g, '$1*(')
        .replace(/\)(\d)/g, ')*$1')
        .replace(/\)\(/g, ')*(');

    return expr;
}