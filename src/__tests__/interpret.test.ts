import { interpret } from '../helpers/interpret';
import { Program } from '../classes/Program';

describe('interpret', () => {
    it('should return correct program', () => {
        const command = 'program';
        expect(interpret(command)).toEqual({
            methods: [],
            program: 'program',
            value: command,
        });
    });

    it('should should parse given method', () => {
        const command = 'program method';
        expect(interpret(command)).toEqual({
            methods: [
                {
                    name: 'method',
                },
            ],
            program: 'program',
            value: command,
        });
    });

    it('should should parse given argruments', () => {
        const command = 'program method --opt1=value1 --opt2=value2';
        expect(interpret(command)).toEqual({
            methods: [
                {
                    name: 'method',
                    opts: {
                        opt1: 'value1',
                        opt2: 'value2',
                    },
                },
            ],
            program: 'program',
            value: command,
        });
    });

    // TODO: fix
    it.skip('should handle complex values', () => {
        const command = 'program "some long method" --key "some long value"';
        expect(interpret(command)).toEqual({
            methods: [
                {
                    name: 'some long method',
                    opts: {
                        key: 'some long value',
                    },
                },
            ],
            program: 'program',
            value: command,
        });
    });

    it('should should handle complex command', () => {
        const command = 'program method1 --opt1=value1 method2 --opt2=value-2 -opt3=Value-3';
        expect(interpret(command)).toEqual({
            methods: [
                {
                    name: 'method1',
                    opts: {
                        opt1: 'value1',
                    },
                },
                {
                    name: 'method2',
                    opts: {
                        opt2: 'value-2',
                        opt3: 'Value-3',
                    },
                },
            ],
            program: 'program',
            value: command,
        });
    });
});
