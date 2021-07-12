import { ICommand, IMethod } from '../types';

// decodes string to a actual command
// command = program method --arg1={arg1value} {value[0]} --arg2={arg2value} {values[1]}

const parseWords = (words = '') =>
    (words.match(/[^\s"]+|"([^"]*)"/gi) || []).map((word) => word.replace(/^"(.+(?="$))"$/, '$1'));

export function interpret(value: string): ICommand {
    const parameters = parseWords(value) as string[];
    const program = parameters.shift() as string;
    const methods = getMethods(parameters) as IMethod[];

    return {
        value,
        program,
        methods,
    };
}

function getMethods(parameters: string[]) {
    // [ [method, arg1, arg2], [method, arg1, arg2]]
    const methods = parameters.reduce((accumulator: string[][], parameter: string, index: number) => {
        if (parameter.startsWith('-') || parameter.startsWith('--')) {
            accumulator[accumulator.length].push(parameter);
        } else {
            accumulator.push([parameter]);
        }
        return accumulator;
    }, []);

    return methods.map((method) => {
        return method.reduce((accumulator: any, parameter: string, index: number) => {

            if (index === 0) {
                accumulator.name = parameter;
            }

            if (parameter.startsWith('-') || parameter.startsWith('--')) {
                accumulator.opts = {
                    ...accumulator.opts,
                    ...strToArg(parameter),
                };
            }

            return accumulator;
        }, {} as IMethod);
    });
}

function strToArg(str: string) {
    const [key, value] = str.split('=');

    return {
        [key.replace(/-/g, '').toLowerCase()]: value ? value : true,
    };
}
