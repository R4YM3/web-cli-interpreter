import { Program } from './Program';
import { ICommand } from '../interpret';

export default new Program({
    indentifier: {
        name: 'whoami',
    },
    version: '1',
    description: 'tells something about whoami',
    methods: [
        {
            indentifier: {
                name: 'info',
                abbreviation: 'i',
            },
            default: true,
            description: 'returns some information',
            execute(command: ICommand) {
                return Promise.resolve(`<p>
                  Spare time project of Raymond Schweers.<br/>
                  To explore, learn and seek new technologies and by doing so creating a handy<br/>
                  command line interface build with: TypeScript, React, and Sass.<br/>
                  version: 99
                </p>`);
            },
        },
        {
            indentifier: {
                name: 'test',
                abbreviation: 't',
            },
            description: 'tells something about this application',
            execute(command: ICommand) {
                return Promise.resolve(`<p>test runned..</p>`);
            },
        },
    ],
});
