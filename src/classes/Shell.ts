import { ICommand } from '../types';
import { interpret } from '../helpers/interpret';
import { Program } from '../classes/Program';

export class Shell {
    private programs: Program[];

    constructor(programs: any[]) {
        this.programs = programs;
    }

    installProgram(program: Program) {
        this.programs.push(program);
    }

    exec(value: string):Promise<string> {
        if (!value) return Promise.resolve('');

        const command = interpret(value);
        const program = this.programs.find(p => p.name === command.program);

        if (!program) {
            return Promise.resolve(`<strong>${command.program}</stong> not found`)
        }

        return program.exec(command);
    }
}
