import { ICommand, ICommandMethod } from '../types';
import { DEFAULT_METHOD_KEY, DEFAULT_METHOD_NAME } from '../constants';
import { dedent } from '../helpers/string';

/*
    usage example: src/program/whoami.ts
*/

interface IOption {
    abbrv: string | null;
    name: string;
    description: string;
    defaultValue: any;
}

interface IMethod {
    isDefault: boolean;
    description: string;
    options: IOption[];
}

interface IMethods {
    [id: string]: IMethod
}

export class Program {
    private _slug: string;
    private _description: string | undefined;
    private _version: string | undefined;
    private _methods: IMethods;
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

    public method({
        name,
        description,
        options,
        isDefault = false,
    }: {
        name: string;
        description: string;
        options?: string[][];
        isDefault?: boolean;
    }) {
        this._addMethod(name, description, isDefault);
        if (options) this._addOptions(name, options);
    }

    private _addMethod(name: string, description: string, isDefault: boolean) {
        this._methods[name] = {
            isDefault,
            description,
            options: [],
        };
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

        return this._methods[methodName].options.push({
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

        if (parsedCommand.methods[0].name === 'help') {
            return Promise.resolve(this.help(command).then(res => dedent(res)));
        }

        return Promise.resolve(this._exec(parsedCommand).then(res => dedent(res)));
    }

    private _parseCommand(command: ICommand): ICommand {
        const methods = command.methods.map((method) => {
            return this._parseOptions(method);
        });

        const defaultMethod = [
            {
                name: this._getDefaultMethodName(),
                opts: {},
            },
        ];

        return {
            ...command,
            methods: methods.length ? methods : defaultMethod,
        };
    }

    private _parseOptions(method: ICommandMethod): ICommandMethod {
        const methodName = method.name === DEFAULT_METHOD_KEY ? this._getDefaultMethodName() : method.name;

        let opts = {};

        if (!method?.opts) {
            return {
                name: methodName,
                opts,
            };
        }

        for (const key of Object.keys(method.opts)) {
            opts = { ...opts, ...this._parseOption(methodName, key, method.opts[key]) };
        }

        return {
            name: methodName,
            opts,
        };
    }

    private _getDefaultMethodName() {
        let defaultName;

        for (const key of Object.keys(this._methods)) {
            const method = this._methods[key];
            if (method.isDefault) {
                defaultName = key;
                break;
            }
        }

        return defaultName ? defaultName : DEFAULT_METHOD_NAME;
    }

    private _parseOption(methodName: string, key: string, val: string | boolean) {
        const method = this._methods[methodName];

        // unknown method
        if (!method) {
            return {
                [key]: val,
            };
        }

        const option = method.options.find((o) => o.name === key || o.abbrv === key);

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

    public help(command: ICommand):Promise<string> {
        if (command.methods.length === 2) {
            const method = command.methods[1];
            const hasMethod = !!this._methods[method.name];

            if (hasMethod) {
                return helpMethod(this.name, method.name, this._methods[method.name]);
            } else {
                return Promise.resolve(`${method.name} does not exist`);
            }
        }


        return help(this.name, this._methods, this.version);
    }
}

function help(programName: string, methods:IMethods, version: string|undefined) {
    const title = `Usage: ${programName} <command>`;

    const methodHelp = `${programName} help &lt;command&gt;`

    const methodsList = `where &lt;command&gt; is one of:
    ${Object.keys(methods).join(', ')}`;

    return Promise.resolve(`${title}

        ${methodHelp}

        ${methodsList}

        ${version && `v${version}`}`)
}

function helpMethod(programName: string, methodName:string, method: IMethod) {
    const title = `Usage: ${programName} ${methodName} ${ method.options.length ? '[options]': ''}`;
    const description = method.description ?  method.description : '';

    let options;
    for (const option of method.options) {
        options = `${options ? options : ''}
        --${option.name}, -${option.abbrv} ${option.description}`
    }

    if (options) {
        options = `Options:${options}`;
    }

    let response = `${title}

        ${description}`;

    if (options) {
        response = `${response}

        ${options}`
    }

    return Promise.resolve(response);
}
