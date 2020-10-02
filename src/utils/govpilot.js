export function evaluateFilterPart(fieldType, operator, v1, v2) {
    switch (fieldType) {
        case 'number':
        case 'currency':
            {
                if (operator === '=') return parseFloat(v1) === parseFloat(v2);
                if (operator === '>') return parseFloat(v1) > parseFloat(v2);
                if (operator === '<') return parseFloat(v1) < parseFloat(v2);
                if (operator === '>=') return parseFloat(v1) >= parseFloat(v2);
                if (operator === '<=') return parseFloat(v1) <= parseFloat(v2);
                if (operator === '<>') return parseFloat(v1) !== parseFloat(v2);
                if (operator === 'null') return v1 === null || v1 === '';
                if (operator === '!null') return v1 !== null && v1 !== '';
                break;
            }
        case 'datetime': {
            if (v1 === '') v1 = '01/01/1900';
            if (operator === '=') return new Date(v1).getTime() === new Date(v2).getTime();
            if (operator === '>') return new Date(v1) > new Date(v2);
            if (operator === '<') return new Date(v1) < new Date(v2);
            if (operator === '>=') return new Date(v1) >= new Date(v2);
            if (operator === '<=') return new Date(v1) <= new Date(v2);
            if (operator === '<>') return new Date(v1).getTime() !== new Date(v2).getTime();
            if (operator === 'null') return v1 === null;
            if (operator === '!null') return v1 !== null;
            break;
        }
        default: {
            if (v1) v1 = v1.toLowerCase();
            if (v2) v2 = v2.toLowerCase();

            if (operator === '=') return v1 === v2;
            if (operator === 'SW') return v1.startsWith(v2);
            if (operator === 'EW') return v1.endsWith(v2);
            if (operator === 'CON') return v1.includes(v2);
            if (operator === 'NCO') return !v1.includes(v2);
            if (operator === '<>') return v1 !== v2;
            if (operator === 'null') return v1 === '';
            if (operator === '!null') return v1 !== '';
            break;
        }
    }

    return false;
}
