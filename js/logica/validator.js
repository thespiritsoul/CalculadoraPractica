export function validateTokens(tokens) {
    let balance = 0;
    let prev = null;

    for (let i = 0; i < tokens.length; i++) {
        const t = tokens[i];
        const val = t.value;

        // 🔹 NÚMEROS
        if (t.type === 'number') {
            if (prev === 'number') {
                throw Error("error de formato");
            }
            prev = 'number';
            continue;
        }

        // 🔹 OPERADORES
        if (t.type === 'op') {

            // 🔸 PARÉNTESIS APERTURA
            if (val === '(') {
                if (prev === 'number' || prev === ')' || prev === 'postfix') {
                    throw Error("error de formato");
                }
                balance++;
                prev = '(';
                continue;
            }

            // 🔸 PARÉNTESIS CIERRE
            if (val === ')') {
                balance--;
                if (balance < 0) throw Error("error de formato");

                if (prev === 'op' || prev === null || prev === '(') {
                    throw Error("error de formato");
                }

                prev = ')';
                continue;
            }

            // 🔸 POSTFIJOS
            if (val === '!' || val === '%') {
                if (prev !== 'number' && prev !== ')') {
                    throw Error("error de formato");
                }
                prev = 'postfix';
                continue;
            }

            // 🔸 RAÍZ
            if (val === '√') {
                const next = tokens[i + 1];
                if (!next) throw Error("error de formato");

                if (
                    next.type !== 'number' &&
                    next.value !== '(' &&
                    next.value !== '-'
                ) {
                    throw Error("error de formato");
                }

                prev = 'op';
                continue;
            }

            // 🔸 OPERADORES BINARIOS
            if (['+', '*', '/', '^'].includes(val)) {
                if (prev !== 'number' && prev !== ')' && prev !== 'postfix') {
                    throw Error("error de formato");
                }
                prev = 'op';
                continue;
            }

            // 🔸 MENOS
            if (val === '-') {
                if (prev === 'number' || prev === ')' || prev === 'postfix') {
                    prev = 'op';
                    continue;
                }

                if (prev === null || prev === '(' || prev === 'op') {
                    prev = 'op';
                    continue;
                }

                throw Error("error de formato");
            }

            throw Error("error de formato");
        }

        throw Error("error de formato");
    }

    if (balance !== 0) throw Error("error de formato");

    const last = tokens.at(-1);

    if (
        last.type === 'op' &&
        !['!', '%', ')'].includes(last.value)
    ) {
        throw Error("error de formato");
    }
}