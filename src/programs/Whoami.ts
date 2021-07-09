// tslint:disable-next-line
import { VERSION as INTERPRETER_VERSION } from '../constants';
import { Program } from '../Program';
import { ICommand } from '../types';

const version = '1.0.0'

export const Whoami = ({ info }: { info: string }) => {

    return new Program({
        indentifier: {
            name: 'whoami',
        },
        version,
        description: 'A program to get information about the curernt command line interface',
        methods: [
            {
                indentifier: {
                    name: 'info',
                    abbreviation: 'i',
                },
                description: 'background information',
                execute(command: ICommand) {
                    return Promise.resolve(info);
                },
            },
            {
                indentifier: {
                    name: 'version',
                    abbreviation: 'v',
                },
                description: 'current installed version',
                execute(command: ICommand) {
                    return Promise.resolve(`
                        web-cli-interpreter: v${INTERPRETER_VERSION}<br/>
                        whoami: v${version}
                    `);
                }
            }
        ]
    });
};