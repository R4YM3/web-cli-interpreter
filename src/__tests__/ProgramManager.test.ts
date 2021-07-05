import { init, programs as defaultPrograms } from '../';
import { Whoami } from '../programs/Whoami';
import { ProgramManagerProgram } from '../programs/ProgramManager';
import { expectHelpMethod } from './program.test';

const FAKE_INFO = 'FAKE_INFO';
const whoami = defaultPrograms.whoami({
    info: FAKE_INFO,
});

const programs = [whoami];

export const interpret = init({
    programs
});

const expectProgramManagerHelp = () => expectHelpMethod(interpret, ProgramManagerProgram(programs));

describe('program', () => {
    it('should return help as default', expectProgramManagerHelp);

    it('should return help', expectProgramManagerHelp);

    it('should return info', () => {
        interpret('program list').then((res) => {
            expect(res).toContain('whoami');
        });
    });

    it('should return version', () => {
        interpret('program version').then((res) => {
            expect(res).toContain('1.0.0');
        });
    });
});
