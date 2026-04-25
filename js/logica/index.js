import { normalize } from './normalize.js';
import { tokenize } from './tokenizer.js';
import { validateTokens } from './validator.js';
import { toPostfix } from './parser.js';
import { evaluate } from './evaluator.js';
import { formatResult } from './mathUtils.js';

export function calculate(expr) {
    try {
        const norm = normalize(expr);
        const tokens = tokenize(norm);

        // 🔥 VALIDACIÓN ANTES DEL PARSER
        validateTokens(tokens);

        const postfix = toPostfix(tokens);
        const result = evaluate(postfix);

        return formatResult(result);
    } catch (e) {
        if (e.message === "Big number") return "Big number";
        return "error de formato";
    }
}