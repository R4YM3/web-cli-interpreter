import { ICommand, ICommandMethod } from './types';

// decode srting to a actual command
// command = program fn --arg value -arg2 value  fn2 -arg1 avlue1

export function interpret(value: string):ICommand {
  const parameters = value.split(' ') as string[];
  const program = parameters.shift() as string;
  const method = makeRecursiveMethods(getMethods(parameters));

  return {
    value,
    program,
    method
  }
}

function getMethods(parameters: string[]) {

  const loggedAgrumentValues: number[] = [];

  function isValueAlreadyLogged(index: number):boolean {
    return !!loggedAgrumentValues.find((i: number) => index === i)
  }

  return parameters.reduce(
    (methods: ICommandMethod[], value: string, index: number) => {

      // when --key is found we take next agrument as value
      // we need to skip taken value
      if (isValueAlreadyLogged(index)) {
        return methods;
      }

      if (value.startsWith('-') || value.startsWith('--')) {
        const {agrument, agrumentValueIndex} = getAgrumentWithValue(parameters, index);
        const method = methods[methods.length - 1];

        if (!method) {
          return methods;
        }

        method.args = method?.args ? { ...method.args, ...agrument } : { ...agrument }
        loggedAgrumentValues.push(agrumentValueIndex);

        return methods;
      }

      methods.push({name: parameters[index]});
      return methods;
    },
    [] as ICommandMethod[],
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

function makeRecursiveMethods(
  methods: ICommandMethod[],
) {

  const recursiveMethods= {} as ICommandMethod;
  let target = recursiveMethods;

  methods.forEach((method: ICommandMethod, index: number) => {
    target.method = method;
    target = target.method;
  });

  return recursiveMethods.method;
}
