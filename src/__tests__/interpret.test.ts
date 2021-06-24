import { interpret } from '../interpret';

describe('interpret', () => {
    it('should return correct program', () => {
        const command = 'program';
        expect(interpret(command)).toEqual({
            fn: undefined,
            program: 'program',
            value: command,
        });
    });

    it('should should parse given functions', () => {
        const command = 'program fn1 fn2 fn3';
        expect(interpret(command)).toEqual({
            fn: {
                name: 'fn1',
                fn: {
                    name: 'fn2',
                    fn: {
                        name: 'fn3',
                    },
                },
            },
            program: 'program',
            value: command,
        });
    });

    it('should should parse given argruments', () => {
        const command = 'program fn1 --arg1 value1 -arg2 value2';
        expect(interpret(command)).toEqual({
            fn: {
                name: 'fn1',
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
        const command = 'program fn1 --arg1 value1 -arg2 value2 fn2 FN3 --Arg3 value-3 fn4 -arg4 value4';
        expect(interpret(command)).toEqual({
            fn: {
                name: 'fn1',
                args: {
                    arg1: 'value1',
                    arg2: 'value2',
                },
                fn: {
                    name: 'fn2',
                    fn: {
                        name: 'FN3',
                        args: {
                            Arg3: 'value-3',
                        },
                        fn: {
                            name: 'fn4',
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
