import { interpret, ICommand } from './interpret';

export const initShell = () => execute;

function execute(value: string): Promise<string> {
    if (!value) return Promise.resolve('')

    const command = interpret(value);

    if (!command.program || command.program === '') {
        return Promise.resolve('');
    }

    return run(command);
}

// run the interperted command
function run(command: ICommand): Promise<string> {
    return Promise.resolve(command.value);
}
