import { programs } from './';
import { Program } from '../Program';
import { ICommand, IProgram } from '../types';

const version = '1.0.0';

export const ProgramManagerProgram = (allPrograms: IProgram[]) =>
    new Program({
        indentifier: {
            name: 'program',
        },
        version,
        description: 'install, update and remove programs',
        methods: [
            {
                indentifier: {
                    name: 'list',
                    abbreviation: 'l',
                },
                description: 'list all programs',
                execute(command: ICommand) {
                    const list = allPrograms.reduce((accumulator: string, prog: IProgram): string => {
                        const {
                            version: programVersion,
                            indentifier: { name },
                        } = prog;

                        return `${accumulator}
                            <tr>
                                <td class="pr-5">${name} ${programVersion}</td>
                            </tr>`;
                    }, '');

                    const response = `<ul>${list}</ul>`;

                    return Promise.resolve(response);
                },
            },
            {
                indentifier: {
                    name: 'version',
                    abbreviation: 'v',
                },
                description: 'current installed version',
                execute(command: ICommand) {
                    return Promise.resolve(`v${version}`);
                },
            },
        ],
    });

export const ProgramManager = (userPrograms: IProgram[]) => {
    const allPrograms = [...userPrograms];

    return {
        programs: [...allPrograms, ProgramManagerProgram(allPrograms)],
    };
};
