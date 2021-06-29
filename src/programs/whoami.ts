import { Program } from './Program';
import { ICommand } from '../interpret';

export default ({ info }: { info: string }) => {

    return new Program({
        indentifier: {
            name: 'whoami',
        },
        version: '1',
        description: 'get information about the current enviroment',
        methods: [
            {
                indentifier: {
                    name: 'info',
                    abbreviation: 'i',
                },
                description: 'more information',
                execute(command: ICommand) {
                    return Promise.resolve(`
                        shell version: v1<br/>
                        enviroment description:<br/>
                        ${info}`);
                },
            },
        ],
    });
};
