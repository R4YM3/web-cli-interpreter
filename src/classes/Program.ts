import { ICommand, IMethod } from '../types';

/*
    usage example: src/program/whoami.ts
*/

interface IOption {
    abbrv: string | null;
    name: string;
    description: string;
    defaultValue: any;
}

export class Program {
    private _slug: string;
    private _description: string | undefined;
    private _version: string | undefined;
    private _methods: {
        [id: string]: IOption[];
    };
    private _options: IOption[];
    private _exec: (command: ICommand) => Promise<string>;

    constructor({
        name,
        description,
        version,
        exec,
    }: {
        name: string;
        description?: string;
        version?: string;
        exec: (command: ICommand) => Promise<string>;
    }) {
        this._slug = name;
        this._description = description;
        this._version = version;
        this._methods = {};
        this._options = [];
        this._exec = exec;
    }

    public get name() {
        return this._slug;
    }

    public get description() {
        return this._description;
    }

    public get version() {
        return this._version;
    }

    public method(name: string, options: string[][]) {
        this._addMethod(name);
        this._addOptions(name, options);
    }

    private _addMethod(name: string) {
        this._methods[name] = [];
    }

    private _addOptions(methodName: string, options: string[][]) {
        for (const option of options) {
            this._addOption(methodName, option);
        }
    }

    private _addOption(methodName: string, [flags, description, defaultValue]: string[]) {
        let abbrv;
        let name;

        if (!flags) return;

        if (flags.includes(',')) {
            [abbrv, name] = flags.split(',');
            abbrv = abbrv ? abbrv.replace('-', '') : null;
            name = getName(name);
        } else {
            abbrv = null;
            name = getName(flags);
        }

        return this._methods[methodName].push({
            abbrv,
            name,
            description,
            defaultValue,
        });

        function getName(str: string): string {
            return str.trim().replace('--', '');
        }
    }

    public exec(command: ICommand): Promise<string> {
        if (this._slug !== command.program) {
            return Promise.resolve('');
        }

        const parsedCommand = this._parseCommand(command);

        return this._exec(parsedCommand);
    }

    private _parseCommand(command: ICommand): ICommand {
        return {
            ...command,
            methods: command.methods.map((method) => {
                return this._parseOptions(method);
            }),
        };
    }

    private _parseOptions(method: IMethod): IMethod {
        let opts = {};

        for (const key of Object.keys(method.opts)) {
            opts = { ...opts, ...this._parseOption(method.name, key, method.opts[key]) };
        }

        return {
            ...method,
            opts,
        };
    }

    private _parseOption(methodName: string, key: string, val: string | boolean) {
        const method = this._methods[methodName];

        // unknown method
        if (!method) {
            return {
                [key]: val,
            };
        }

        const option = method.find((o) => o.name === key || o.abbrv === key);

        // option is not pre-defined
        if (!option) {
            return {
                [key]: val,
            };
        }

        const defaultValue = option.defaultValue ? option.defaultValue : true;
        const value = val ? val : defaultValue;

        // if set with abbrv, then rename abbrv to name
        if (key === option.abbrv) {
            return {
                [option.name]: value,
            };
        }

        return {
            [key]: value,
        };
    }
}
