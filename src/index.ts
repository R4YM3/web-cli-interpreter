import { interpret, ICommand } from './interpret';
import { ProgramManager } from './programs/ProgramManager'
export { programs }  from './programs'

interface IOptions {
    programs?: any[];
}

type IDecodedCommand= ICommand | '';

export const init = ({ programs: userPrograms = [] }: IOptions) => (value: string) => {

    return decode(value).then(run);

    function decode(val: string): Promise<IDecodedCommand> {
        if (!val) return Promise.resolve('');

        const command = interpret(val.replace(/\s+/g, ' '));
        return Promise.resolve(command);
    }

    function run(command: IDecodedCommand): Promise<string> {
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
};
