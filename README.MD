# web-cli-interpreter

Interpretates a string as a command and will run it on given programs.

_note: this project is still under heavy development_


## Installing

```npm i web-cli-interpreter --save```

## How to use

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

## Command Interpertation
A given command should be in the following scheme:

```command = program method -flags --arg1 {arg1value} {value[0]} --arg2 {arg2value} {values[1]}```

## Programs
Currently this project has the following programs:

- whoami
- program

```program``` is a program manager, which currently only will list programs, but in the future it will allow user to install (certain) programs.

## Creating your own programs
`import { Program } from "web-cli-interpreter";`

Create a new instance and add the program in programs array in init() function.
