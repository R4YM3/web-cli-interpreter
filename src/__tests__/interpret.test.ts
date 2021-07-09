import { interpret } from "../interpret"
import { Program } from '../Program';

describe('interpret', () => {
    it('should return correct program', () => {
        const command = 'program';
        expect(interpret(command)).toEqual({
            method: undefined,
            program: 'program',
            value: command,
            args: {
                values: [],
                flags: []
            }
        });
    });

    it('should should parse given method', () => {
        const command = 'program method';
        expect(interpret(command)).toEqual({
            method: 'method',
            program: 'program',
            value: command,
            args: {
                values: [],
                flags: []
            }
        });
    });

    it('should should parse given argruments', () => {
        const command = 'program method --arg1 value1 --arg2 value2';
        expect(interpret(command)).toEqual({
            args: {
                arg1: 'value1',
                arg2: 'value2',
                values: [],
                flags: []
            },
            method: 'method',
            program: 'program',
            value: command,
        });
    });

    it('should should parse given flags', () => {
        const command = 'program method -flags';
        expect(interpret(command)).toEqual({
            args: {
                values: [],
                flags: ['f','l','a','g','s']
            },
            method: 'method',
            program: 'program',
            value: command,
        });
    });

    it('should should parse given values', () => {
        const command = 'program method "a value" another_value';
        expect(interpret(command)).toEqual({
            args: {
                values: [
                    'a value',
                    'another_value'
                ],
                flags: []
            },
            method: 'method',
            program: 'program',
            value: command,
        });
    });

    it('should should handle complex command', () => {
        const command = 'program method --arg1 value1 -flags value1 value2 --Arg2 value-2 value3 --arg3 Value-3';
        expect(interpret(command)).toEqual({
            args: {
                arg1: 'value1',
                arg2: 'value-2',
                arg3: 'Value-3',
                values: [
                    'value1',
                    'value2',
                    'value3'
                ],
                flags: ['f','l','a','g','s']
            },
            method: 'method',
            program: 'program',
            value: command,
        });
    });
});
