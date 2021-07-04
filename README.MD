# web-cli-interpreter

A package which will interpretate a given string as a command and will run it on given programs.

_note: this project is still under heavy development_

```
import { init, programs as defaultPrograms } from "web-cli-interpreter";

const whoami = defaultPrograms.whoami({
    info: `<p>information to output on command 'whoami info'</p>`,
});

const interpret = init({
    programs: [whoami],
});

interpret('whoami info');

```

## Interpertation of given string
A given command should be in the following scheme:

```program method1 --arg1 value -arg2 value  nested-method-inside-method1 --arg1 value```

tbd..

## Programs
Currently this project has the following programs:

- whoami
- program

```program``` is a program manager, which currently only will list programs, but in the future it will allow user to install (certain) programs.

## Creating your own programs
`import { Program } from "web-cli-interpreter";`

Create a new instance and add the program in programs array in init() function.

tbd..
