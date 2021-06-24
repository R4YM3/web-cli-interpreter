import { interpret, ICommand } from './interpret';

interface IConfig {
    programs?: any[];
}

type IResponse = ICommand | '';

export const init = ({ programs= [] }: IConfig) => (value: string) => {

    return decode(value).then(run);

    function decode(val: string): Promise<IResponse> {
        if (!val) return Promise.resolve('');

        const command = interpret(val.replace(/\s+/g, ' '));
        return Promise.resolve(command);
    }

    function run(command: IResponse): Promise<string> {
        if (!command) return Promise.resolve('');

        if (!command.program || command.program === '') {
            return Promise.resolve('');
        }

        const program = programs.find((prog) => prog.name === command.program);

        if (!module) {
            return Promise.resolve(`command not found: ${command.program}`);
        }

        return Promise.resolve(command.value);
    }
};
