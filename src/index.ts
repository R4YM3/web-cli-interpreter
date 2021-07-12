import { Shell } from './classes/Shell';
import { Program } from './classes/Program';

export { Shell } from './classes/Shell';
export { Program } from './classes/Program';
export { programs }  from './program/all';

export const init = ({ programs = [] }: { programs: Program[] }) => {
    const shell = new Shell(programs);

    return (value: string) => {
        return shell.exec(value);
    };
}

/*
import { interpret } from './interpret';
import { ProgramManager } from './programs/ProgramManager';
import { ICommand } from './types';

export { programs } from './programs';
export { Program } from './Program';

interface IOptions {
    programs?: IProgram[];
}

type IDecodedCommand = ICommand | '';

export const init =
    ({ programs = [] }: IOptions) =>
    (value: string) => {
        return decode(value).then((command) => run(command, programs));
    };

function decode(val: string): Promise<IDecodedCommand> {
    if (!val) return Promise.resolve('');

    const command = interpret(val.replace(/\s+/g, ' ')); // remove double spaces
    return Promise.resolve(command);
}

function run(command: IDecodedCommand, userPrograms: IProgram[]): Promise<string> {
    if (!command) return Promise.resolve('');

    if (!command.program || command.program === '') {
        return Promise.resolve('');
    }

    const { programs } = ProgramManager([...userPrograms]);

    const program = programs.find((prog) => prog.indentifier.name === command.program);

    if (!program) {
        return Promise.resolve(`command not found: ${command.program}`);
    }

    return program.execute(command);
}
*/
