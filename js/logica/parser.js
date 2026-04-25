const PRECEDENCE = {
    '!': 6,
    '%': 6,
    'SQRT': 5,
    'ROOT': 5,
    '^': 4,
    'NEG': 3,
    '*': 2,
    '/': 2,
    '+': 1,
    '-': 1
};

const RIGHT_ASSOC = ['^', 'NEG', 'SQRT'];

export function toPostfix(tokens) {
    const output = [];
    const stack = [];

    let prev = null;

    for (let i = 0; i < tokens.length; i++) {
        let t = tokens[i];

        if (t.type === 'number') {
            output.push(t);
            prev = 'number';
            continue;
        }

        let op = t.value;

        if (op === '(') {
            stack.push(op);
            prev = '(';
            continue;
        }

        if (op === ')') {
            while (stack.length && stack.at(-1) !== '(') {
                output.push({ type: 'op', value: stack.pop() });
            }
            if (!stack.length) throw Error("error de formato");
            stack.pop();
            prev = ')';
            continue;
        }

        // 🔥 detectar negativo unario
        if (op === '-' && (prev === null || prev === '(' || prev === 'op')) {
            op = 'NEG';
        }

        // 🔥 detectar tipo de raíz
        if (op === '√') {
            if (prev === 'number' || prev === ')') {
                op = 'ROOT'; // n√x
            } else {
                op = 'SQRT'; // √x
            }
        }

        // operador
        while (
            stack.length &&
            stack.at(-1) !== '(' &&
            (
                PRECEDENCE[stack.at(-1)] > PRECEDENCE[op] ||
                (
                    PRECEDENCE[stack.at(-1)] === PRECEDENCE[op] &&
                    !RIGHT_ASSOC.includes(op)
                )
            )
        ) {
            output.push({ type: 'op', value: stack.pop() });
        }

        stack.push(op);
        prev = 'op';
    }

    while (stack.length) {
        let op = stack.pop();
        if (op === '(') throw Error("error de formato");
        output.push({ type: 'op', value: op });
    }

    return output;
}