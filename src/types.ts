export interface ICommand {
    value: string;
    program: string;
    method?: ICommandMethod;
}

interface ICommandAgrument {
    [id: string]: string;
}

export interface ICommandMethod {
    name: string;
    args?: ICommandAgrument;
    method?: ICommandMethod;
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
