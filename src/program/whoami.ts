import { VERSION as INTERPRETER_VERSION } from '../constants';
import { Program } from '../classes/Program';
import { ICommand } from '../types';

const version = '1.0.0';

const program = new Program({
    name: 'whoami',
    description: 'A program to get information about the curernt command line interface',
    version: '1.0.0',
    exec,
});

program.method('info', [
   [ '-i, --info', 'background info', 'A program to get information about the curernt command line interface'],
]);

function exec(command: ICommand) {
    console.log("COMMAND=", command);
    return Promise.resolve('foo');
}

export const whoami = program;
