export interface ICommand {
    value: string;
    program: string;
    methods: IMethod[],
}

export interface IMethod {
    name: string;
    opts: {
        [id: string]: string | boolean;
    };
}
