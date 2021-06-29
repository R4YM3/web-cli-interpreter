import { ICommand } from '../interpret';

interface Iidentifier {
    name: string;
    abbreviation?: string;
}

interface IProgram {
    indentifier: Iidentifier;
    description: string;
    version: string;
    methods: IProgramMethod[];
}

interface IProgramMethod {
    indentifier: Iidentifier;
    default?: boolean;
    description: string;
    execute(arg0: ICommand): Promise<string>;
}

export class Program {
    public indentifier: Iidentifier;
    private description: string;
    private version: string;

    private methods: IProgramMethod[] = [];

    constructor({ indentifier, description, version, methods }: IProgram) {
        this.indentifier = indentifier;
        this.description = description;
        this.version = version;
        this.methods = [info(description), getVersion(version), help(), ...methods];
    }

    public execute(command: ICommand): Promise<string> {
        if (!command.fn) {
            const defaultMethod = getDefaultMethod(this.methods);

            if (!defaultMethod) {
                return Promise.resolve(`${command.program} is missing default method`);
            }

            return defaultMethod.execute(command);
        }

        return Promise.resolve('TODO: methods not mapped yet');
    }
}

function getDefaultMethod(methods: IProgramMethod[]):IProgramMethod|undefined {
    function isDefaultMethod(method: IProgramMethod): boolean {
        return method.default === true;
    }
    return methods.find(isDefaultMethod);
}

function info(description: string): IProgramMethod {
    return {
        indentifier: {
            name: 'info',
            abbreviation: 'i',
        },
        description: 'returns the description of the program',
        execute() {
            return Promise.resolve(description);
        },
    };
}

function getVersion(version: string): IProgramMethod {
    return {
        indentifier: {
            name: 'version',
            abbreviation: 'v',
        },
        description: 'returns the current version',
        execute() {
            return Promise.resolve(version);
        },
    };
}

function help(): IProgramMethod {
    return {
        indentifier: {
            name: 'help',
            abbreviation: 'h',
        },
        description: 'program help',
        execute() {
            return Promise.resolve(`should return commands with names and abbreviations`);
        },
    };
}
