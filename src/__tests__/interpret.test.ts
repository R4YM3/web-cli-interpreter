import { interpret } from "../interpret"
import { Program } from '../Program';

describe('interpret', () => {
    it('should return correct program', () => {
        const command = 'program';
        expect(interpret(command)).toEqual({
            method: undefined,
            program: 'program',
            value: command,
        });
    });

    it('should should parse given functions', () => {
        const command = 'program method1 method2 method3';
        expect(interpret(command)).toEqual({
            method: {
                name: 'method1',
                method: {
                    name: 'method2',
                    method: {
                        name: 'method3',
                    },
                },
            },
            program: 'program',
            value: command,
        });
    });

    it('should should parse given argruments', () => {
        const command = 'program method1 --arg1 value1 -arg2 value2';
        expect(interpret(command)).toEqual({
            method: {
                name: 'method1',
                args: {
                    arg1: 'value1',
                    arg2: 'value2',
                },
            },
            program: 'program',
            value: command,
        });
    });

    it('should should handle complex command', () => {
        const command = 'program method1 --arg1 value1 -arg2 value2 method2 method3 --Arg3 value-3 method4 -arg4 value4';
        expect(interpret(command)).toEqual({
            method: {
                name: 'method1',
                args: {
                    arg1: 'value1',
                    arg2: 'value2',
                },
                method: {
                    name: 'method2',
                    method: {
                        name: 'method3',
                        args: {
                            Arg3: 'value-3',
                        },
                        method: {
                            name: 'method4',
                            args: {
                                arg4: 'value4',
                            },
                        },
                    },
                },
            },
            program: 'program',
            value: command,
        });
    });
});
