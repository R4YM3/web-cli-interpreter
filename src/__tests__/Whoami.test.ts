import { init, programs as defaultPrograms } from '../';
import { Whoami } from '../programs/Whoami';
import { expectHelpMethod } from './program.test'

const FAKE_INFO = 'FAKE_INFO';

const whoami = defaultPrograms.whoami({
    info: FAKE_INFO,
});

export const interpret = init({
    programs: [whoami],
});

const expectWhoamiHelp = () => expectHelpMethod(interpret, whoami)

describe('whoami', () => {
    it('should return help as default', expectWhoamiHelp);

    it('should return help', expectWhoamiHelp);

    it('should return info', () => {
        interpret('whoami info').then((res) => {
            expect(res).toContain(FAKE_INFO);
        });
    });

    it('should return version', () => {
        interpret('whoami').then((res) => {
            expect(res).toContain(whoami.version);
        });
    });
});

