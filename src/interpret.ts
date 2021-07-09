import { ICommand, ICommandAgrument } from './types';

// decodes srting to a actual command
// command = program method --arg1 {arg1value} {value[0]} -flags --arg2 {arg2value} {values[1]}

const parseWords = (words = '') =>
    (words.match(/[^\s"]+|"([^"]*)"/gi) || []).map((word) => word.replace(/^"(.+(?="$))"$/, '$1'));

export function interpret(value: string): ICommand {
    const parameters = parseWords(value) as string[];
    const program = parameters.shift() as string;
    const method = parameters.shift() as string;
    const args = getAgruments(parameters);

    return {
        value,
        program,
        method,
        args,
    };
}

function getAgruments(parameters: string[]) {
    let skipNextInteraction = false;

    return parameters.reduce(
        (args: ICommandAgrument, parameter: string, index: number) => {
            // when --key is found we take next agrument as value
            // we need to skip taken value
            if (skipNextInteraction) {
                skipNextInteraction = false;
                return args;
            }

            if (isFlag(parameter) || isAgrument(parameter)) {
                const key = parameter.replace(/-/g, '').toLowerCase();

                if (isAgrument(parameter)) {
                    const value = parameters[index + 1];
                    skipNextInteraction = true;
                    args[key] = value;
                    return args;
                } else {
                    const flags = key.split("");
                    args.flags = flags.filter((item:string, pos:number)  => {
                        return flags.indexOf(item) === pos;
                    })
                    return args
                }
            } else {
                args.values.push(parameter);
                return args;
            }
        },
        { values: [], flags: [] } as ICommandAgrument,
    );
}

function isAgrument(str: string) {
    return str.startsWith('--');
}

function isFlag(str: string) {
    return str.startsWith('-');
}
