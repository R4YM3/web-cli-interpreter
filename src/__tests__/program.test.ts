import { init, programs as defaultPrograms } from '../';
import { Program, IProgram } from '../Program';

const PROGRAM_NAME = 'test';
const METHOD_NAME = 'info';
const MEHOD_RESPONSE = 'method response';

describe('Program', () => {
    describe('when default method is given', () => {
        const hasDefaultProgram = true;
        const program = createFakeProgram(hasDefaultProgram);

        const interpret = init({
            programs: [program],
        });

        it('should run given method', () => {
            interpret(`${PROGRAM_NAME} ${METHOD_NAME}`).then((res) => {
                expect(res).toContain(MEHOD_RESPONSE);
            });
        });

        it('should run default mehod', () => {
            interpret(PROGRAM_NAME).then((res) => {
                expect(res).toContain(MEHOD_RESPONSE);
            });
        });
    });

    describe('when no default method is given', () => {
        const hasDefaultProgram = false;
        const program = createFakeProgram(hasDefaultProgram);

        const interpret = init({
            programs: [program],
        });

        it('should run help', () => {
            expectHelpMethod(interpret, program);
        });
    });
});

export function expectHelpMethod(interpret: (command: string) => Promise<string>, program: IProgram) {
    interpret(program.indentifier.name).then((res) => {
        expect(res).toContain(program.version);

        for (const method of program.methods) {
            if (method.indentifier.name === 'help') continue;
            expect(res).toContain(method.indentifier.name);
            expect(res).toContain(method.description);
        }
    });
}

function createFakeProgram(hasDefault: boolean): IProgram {
    return new Program({
        indentifier: {
            name: PROGRAM_NAME,
        },
        version: '1.0.0',
        description: 'test descripiont',
        methods: [
            {
                indentifier: {
                    name: METHOD_NAME,
                    abbreviation: 'i',
                },
                default: hasDefault,
                description: 'background information',
                execute(command) {
                    return Promise.resolve(MEHOD_RESPONSE);
                },
            },
        ],
    });
}
