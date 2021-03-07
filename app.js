
const fs = require('fs');
const { demandOption, string } = require('yargs');
const yargs = require('yargs');
const { listNotes } = require('./notes.js');
const notes = require('./notes.js');
yargs.version('1.1.0')
// create add command

yargs.command({
    command: 'add' ,
    describe: 'add a new note',
    builder:{
           title:{
               describe: 'Note title',
               demandOption:true,
               type: 'string'
           },
           body:{
               describe:'note body',
               demandOption:true,
               type:'string'
           }   
    },
    handler: function (argv) {
        notes.addNote(argv.title , argv.body);
    }
});
 
// remove note
yargs.command({
    command: 'remove' ,
    describe: 'remove note',
    builder:{
        title:{
            describe:'mention title of note to remove',
            demandOption:true ,
            type: 'string'
        }
    },
    handler: function (argv) {
        notes.removeNotes(argv.title)
    }
});
// list command
yargs.command({
    command: 'list' ,
    describe: 'list all notes',
    
    handler: function () {
        notes.listNotes()
    }
});
// read command
yargs.command({
    command: 'read' ,
    describe: 'read note',
    builder: {
        title:{
            describe:"mention title to find that note",
            demandOption:true,
            type: 'string'
        }
    },
    handler: function (argv) {
        notes.findNote(argv.title)
    }
});

yargs.parse()
