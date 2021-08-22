# webcli-interpreter

Interprets a string as a command and will run it on given programs.

_note: this project is still under heavy development and not stable_


## Installing

```npm i webcli-interpreter --save```

## How to use

```
import { init, programs as defaultPrograms } from "webcli-interpreter";

export const interpret = init({
    programs: defaultPrograms
});

```

## Command Interpertation
A given command should be in the following scheme:

```command = program method --opt1={value} --opt2={value} method2 --opt1={value} --opt2={value}```

_When no agrument value given, then the value will be `true`_

## Programs
Currently this project has the following programs:

- whoami

## Creating your own programs
`import { Program } from "web-cli-interpreter";`

Create a new instance, this instance will receive the interpreted command.
See examples: https://github.com/R4YM3/webcli-interpreter/tree/master/src/program

Create a frontend and add the program in programs array in init() function.
