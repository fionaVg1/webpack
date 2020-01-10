#!/usr/bin/env node
let program = require('commander');
program.version('0.0.0')
    .option('-t,--type <type>', 'project type')
    .option('-n,--name <name>', 'project name')
program.command('create').action(function (name) {
    console.log(program.name,program.type);
});
program.parse(process.argv);
