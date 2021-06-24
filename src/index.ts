import { interpret, ICommand } from './interpret';

export const interpreter = () => {
    return (value: string): string => {
        if (!value) return '';

        const command = interpret(value);

        if (!command.program || command.program === '') {
            return '';
        }

        return execute(command);
    };
};

// run the interperted command
function execute(command: ICommand): string {
    return command.value;
}
