import { VERSION as INTERPRETER_VERSION } from '../constants';
import { Program, IExecArgs } from '../classes/Program';

const version = '1.0.0'

const program = new Program({
    name: 'whoami',
    description: 'A program to get information about the curernt command line interface',
    version: '1.0.0',
    exec
});

program
  .option('-i, --info', 'background info', 'A program to get information about the curernt command line interface')

function exec({ command, opts }: IExecArgs ) {
    console.log("COMMAND", command);
    console.log("OPTS", opts);
    return Promise.resolve('foo');
}

export const whoami = program;
