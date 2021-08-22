import { VERSION as INTERPRETER_VERSION } from '../constants';
import { init, programs as defaultPrograms } from '../';
import { whoami, VERSION as WHOAMI_VERSION, BACKGROUND as WHOAMI_BACKGROUND } from '../program/whoami';

export const interpret = init({
    programs: [defaultPrograms.whoami],
});

describe('whoami', () => {
    it('should return help as default', ()  => {
        interpret('whoami').then((res) => {
            expect(res).toContain(`webcli-interpreter: ${INTERPRETER_VERSION}`);
        });
    });

    it('should return help', () => {
        interpret('whoami help').then((res) => {
            expect(res).toContain(WHOAMI_VERSION);
        });
    });

    it('should return background', () => {
        interpret('whoami background').then((res) => {
            expect(res).toContain(WHOAMI_BACKGROUND);
        });
    });
});
