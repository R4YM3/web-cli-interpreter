import { Shell } from './classes/Shell';
import { Program } from './classes/Program';

export { Shell } from './classes/Shell';
export { Program } from './classes/Program';
export { programs }  from './program/all';

export const init = ({ programs = [] }: { programs: Program[] }) => {
    const shell = new Shell(programs);

    return (value: string) => {
        return shell.exec(value).then((response:string) => {

            return Promise.resolve(response);
        })
    };
}
