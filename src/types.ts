export interface ICommand {
    value: string;
    program: string;
    method: string,
    args: ICommandAgrument;
}

export interface ICommandAgrument {
    values: string[];
    flags: string[];
    [id: string]: string|boolean|string[];
}

export interface IProgramIdentifier {
    name: string;
    abbreviation?: string;
}

export interface IProgramArgs {
    indentifier: IProgramIdentifier;
    description: string;
    version: string;
    methods: IProgramMethod[];
}

export interface IProgram extends IProgramArgs {
    execute(arg0: ICommand): Promise<string>;
}

export interface IProgramMethod {
    indentifier: IProgramIdentifier;
    default?: boolean;
    description: string;
    execute(arg0: ICommand): Promise<string>;
}
