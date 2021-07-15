# web-cli-interpreter

Interprets a string as a command and will run it on given programs.

_note: this project is still under heavy development_


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

```command = program method --arg1={arg1value} --arg2={arg2value}  method2 --method2-arg={arg2value}```

## Programs
Currently this project has the following programs:

- whoami

## Creating your own programs
`import { Program } from "web-cli-interpreter";`

Create a new instance and add the program in programs array in init() function.
