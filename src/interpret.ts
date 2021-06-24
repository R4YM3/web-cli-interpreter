// decode srting to a actual command
// command = program fn --arg value -arg2 value  fn2 -arg1 avlue1

export function interpret(value: string):ICommand {
  const parameters = value.split(' ') as string[];
  const program = parameters.shift() as string;
  const fn = makeRecursiveFunctions(getFunctions(parameters));

  return {
    value,
    program,
    fn
  }
}

function getFunctions(parameters: string[]) {

  const loggedAgrumentValues: number[] = [];

  function isValueAlreadyLogged(index: number):boolean {
    return !!loggedAgrumentValues.find((i: number) => index === i)
  }

  return parameters.reduce(
    (fns: IFn[], value: string, index: number) => {

      // when --key is found we take next agrumentt as value
      // we need to skip taken value
      if (isValueAlreadyLogged(index)) {
        return fns;
      }

      if (value.startsWith('-') || value.startsWith('--')) {
        const {agrument, agrumentValueIndex} = getAgrumentWithValue(parameters, index);
        const fn = fns[fns.length - 1];

        if (!fn) {
          return fns;
        }

        fn.args = fn?.args ? { ...fn.args, ...agrument } : { ...agrument }
        loggedAgrumentValues.push(agrumentValueIndex);

        return fns;
      }

      fns.push({name: parameters[index]});
      return fns;
    },
    [] as IFn[],
  )
}

function getAgrumentWithValue(parameters: string[], keyIndex: number) {
  const agrumentKey = parameters[keyIndex].replace(/-/g, '');
  const agrumentValueIndex = keyIndex + 1;
  const agrumentValue = parameters[agrumentValueIndex];

  const agrument = {
    [agrumentKey]: agrumentValue,
  };

  return {
    agrumentValueIndex,
    agrument,
  };
}

function makeRecursiveFunctions(
  functions: IFn[],
) {

  const recursiveFunctions = {} as IFn;
  let target = recursiveFunctions;

  functions.forEach((fn: IFn, index: number) => {
    target.fn = fn;
    target = target.fn;
  });

  return recursiveFunctions.fn
}

export interface ICommand {
    value: string;
    program: string;
    fn?: IFn
}

interface IAgrument {
  [id: string]: string;
}

export interface IFn{
  name: string;
  args?: IAgrument;
  fn?: IFn;
}
