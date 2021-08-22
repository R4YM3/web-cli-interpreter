import { VERSION as INTERPRETER_VERSION } from '../constants';
import { Program } from '../classes/Program';
import { ICommand } from '../types';

export const VERSION = '1.0.0';
export const BACKGROUND = 'Spare time project of Raymond Schweers. To explore, learn and seek new technologies and by doing so creating a handy command line interface build with: TypeScript, React, and Tailwind CSS'

const program = new Program({
    name: 'whoami',
    description: 'A program to get information about the current command line interface',
    version: VERSION,
    exec,
});

program.method({
    name: 'background',
    description: 'backgroud information about this project'
});

program.method({
    name: 'version',
    isDefault: true,
    description: 'returns version of shell',
});

// move this inside Program?
function exec(command: ICommand) {
    const methodName:string = command.methods[0].name;
    // @ts-ignore
    const fn = methods[methodName];
    if (fn) {
        return fn(command);
    } else {
        return Promise.resolve(`${methodName} does not exist`);
    }
}

const methods = {

    background(command:ICommand) {
        return Promise.resolve(BACKGROUND)
    },

    version(command:ICommand) {
        return Promise.resolve(`webcli-interpreter: ${INTERPRETER_VERSION}`)
    }
}

export const whoami = program;
