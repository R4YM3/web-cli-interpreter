import { ICommand } from './interpret';

interface IIdentifier {
    name: string;
    abbreviation?: string;
}

export interface IProgramArgs {
    indentifier: IIdentifier;
    description: string;
    version: string;
    methods: IProgramMethod[];
}

export interface IProgram extends IProgramArgs  {
    execute(arg0: ICommand): Promise<string>;
}

interface IProgramMethod {
    indentifier: IIdentifier;
    default?: boolean;
    description: string;
    execute(arg0: ICommand): Promise<string>;
}

export class Program {
    public indentifier: IIdentifier;
    private description: string;
    private version: string;

    private methods: IProgramMethod[] = [];

    constructor({ indentifier, description, version, methods }: IProgramArgs) {
        this.indentifier = indentifier;
        this.description = description;
        this.version = version;

        this.methods = [
            help({
                name: indentifier.name,
                description,
                version,
                methods,
            }),
            ...methods,
        ];
    }

    public execute(command: ICommand): Promise<string> {
        if (!command.method || !command.method.name) {
            const defaultMethod = getDefaultMethod(this.methods);

            if (defaultMethod) {
                return defaultMethod.execute(command);
            }

            const helpMethod = getMethod({
                indentifier: 'help',
                methods: this.methods,
            });

            if (helpMethod) {
                return helpMethod.execute(command);
            } else {
                return Promise.resolve(`${command.program} is missing default method`);
            }
        }

        const method = getMethod({
            indentifier: command.method.name,
            methods: this.methods,
        });

        if (!method) {
            return Promise.resolve(`${command.program} method ${command.method.name} not found`);
        }

        return method.execute(command);
    }
}

function getMethod({ indentifier, methods }: { indentifier: string; methods: IProgramMethod[] }) {
    function isMethod(method: IProgramMethod): boolean {
        return method.indentifier.name === indentifier || method.indentifier.abbreviation === indentifier;
    }
    return methods.find(isMethod);
}

function getDefaultMethod(methods: IProgramMethod[]): IProgramMethod | undefined {
    function isDefaultMethod(method: IProgramMethod): boolean {
        return method.default === true;
    }
    return methods.find(isDefaultMethod);
}

function help({
    name: programName,
    description,
    version,
    methods,
}: {
    name: string;
    description: string;
    version: string;
    methods: IProgramMethod[];
}): IProgramMethod {
    return {
        indentifier: {
            name: 'help',
            abbreviation: 'h',
        },
        description: 'Help',
        execute() {
            const methodsDocs  = methods.reduce((accumulator: string, method: IProgramMethod): string => {
                const { name, abbreviation } = method.indentifier;
                return `${accumulator}
                    <tr>
                        <td class="pr-5"><strong>${programName} ${name}</strong></td>
                        <td>${method.description}</td>
                    </tr>`;
            }, '');

            const response = (`
                <p>Description:</p>
                <p>${description}</p>
                <p>Usage:</p>
                <p>
                    <table>${methodsDocs}</table>
                </p>
                <p>Version: v${version}</p>
            `)

            return Promise.resolve(response);
        },
    };
}
