import { ICommand, ICommandMethod } from '../types';

// decodes string to a actual command
// command = program method --method1arg={value} method2 --method2arg={value}

const parseWords = (words = '') =>
    (words.match(/[^\s"]+|"([^"]*)"/gi) || []).map((word) => word.replace(/^"(.+(?="$))"$/, '$1'));

export function interpret(value: string): ICommand {
    const parameters = parseWords(value) as string[];
    const program = parameters.shift() as string;
    const methods = getMethods(parameters) as ICommandMethod[];

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

            if (!accumulator.length) {
                // arg given but no method
                accumulator.push([
                    'defaultMethod',
                    parameter
                ]);
            } else {
                accumulator[accumulator.length - 1].push(parameter);
            }
        } else {
            accumulator.push([parameter]);
        }
        return accumulator;
    }, []);

    /*
        [
            {
                name: 'program-name',
                opts: {
                    arg1: 'argvalue',
                    arg2: true
                }
            },
            ...
            ...
        ]

    */
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
        }, {} as ICommandMethod);
    });
}

function strToArg(str: string) {
    const [key, value] = str.split('=');

    return {
        [key.replace(/-/g, '').toLowerCase()]: value ? value : '',
    };
}
