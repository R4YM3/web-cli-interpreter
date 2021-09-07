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
            return Promise.resolve(`<span><strong>${command.program}</strong> not found</span>`)
        }

        return program.exec(command);
    }
}
