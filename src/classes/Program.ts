import { ICommand } from '../types';

/*
const program = new Program(...);

program
  .version('0.0.1')
  .arg('-n', --number <numbers...>', 'specify numbers')
  .arg('-l, --letter [letters...]', 'specify letters')
 */

interface IOption {
    abbrv: string | null;
    name: string;
    description: string;
    defaultValue: any;
    value: null | string;
}

export interface IExecArgs {
    command: ICommand;
    opts: {
        [id: string]: string;
    }
}

export class Program {
    private _slug: string;
    private _description: string | undefined;
    private _version: string | undefined;
    private _options: IOption[];
    private _exec: (context: IExecArgs) => Promise<string>;

    constructor({
        name,
        description,
        version,
        exec,
    }: {
        name: string;
        description?: string;
        version?: string;
        exec: (context: IExecArgs) => Promise<string>;
    }) {
        this._slug = name;
        this._description = description;
        this._version = version;
        this._options = [];
        this._exec = exec;
    }

    public set name(name: string) {
        this._slug = name;
    }

    public get name(): string {
        return this._slug;
    }

    public set description(description: string) {
        this._description = description;
    }

    public set version(version: string) {
        this._version = version;
    }

    public method() {
        // add method
    }

    // to method..
    public option(flags: string, description: string, defaultValue: string) {
        this._parseOption(flags, description, defaultValue);
    }

    private _parseOption(flags: string, description: string, defaultValue: string) {
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

        return this._options.push({
            abbrv,
            name,
            description,
            value: null,
            defaultValue,
        });

        function getName(str: string): string {
            return str.trim().replace('--', '');
        }
    }

    public exec(command: ICommand) {
        if (this._slug !== command.program) {
            return;
        }

        const opts = this._getOpts(command);

        this._exec({
            command,
            opts,
        });
    }

    // for eeach method..
    private _getOpts({ args }: ICommand) {
        return Object.keys(args).reduce((accumulator: {}, key: string) => {
            const option = this._options.find((opt: IOption) => opt.abbrv === key || opt.name === key);

            if (option) {
                option.value = args[key] ? args[key] : option.defaultValue;
                return { ...accumulator, [option.name]: option.value };
            }

            return accumulator;
        }, {} as {});
    }
}
