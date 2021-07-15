export interface ICommand {
    value: string;
    program: string;
    methods: ICommandMethod[],
}

export interface ICommandMethod {
    name: string;
    opts: {
        [id: string]: string|boolean;
    };
}
