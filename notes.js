const fs = require('fs')
const chalk = require('chalk')
const getNotes = function(){
    return 'your notes...'
}
const addNote = function(title,body){
    const notes = loadNotes()
    
    // find method returns first match if found any and if not than find will return undefined
    const duplicateNote = notes.find((element)=>{
        return element.title === title
})
    if (!duplicateNote) {
        notes.push({
            title: title ,
            body: body 
        })
        saveNotes(notes)
        console.log("new note added")

    }else {
        console.log("notes title taken")
    }

}
const findNote = function(title) {
    const notes = loadNotes()
    const foundNote = notes.find((element)=>{
        
       return element.title === title
    });
    // console.log(foundNote)
    if(foundNote !== undefined) {
        console.log(chalk.bgWhite(chalk.black(`${foundNote.title}`)))
        console.log(chalk.italic(`${foundNote.body}`))
    }else {
        console.log(chalk.bgRed('Not found')) 
    }
}
const saveNotes = function(notes){
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJSON)
}
// remove note
const removeNotes = function(title) {
    const notes = loadNotes()
    const arrayToSave = notes.filter((element)=>{
        return element.title !== title
    })
    if (arrayToSave.length === notes.length-1){
        // note is removed
        console.log(chalk.bgGreen('Note removed'))
    }else {
        // note not found
        console.log(chalk.bgRed('Note not found'))
    }
    saveNotes(arrayToSave)
}
const loadNotes = function(){
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJson = dataBuffer.toString()
        return JSON.parse(dataJson)
    } catch (e) {
        return []
    }
}
const listNotes = function(){
    try {
        let i = 1
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJson = dataBuffer.toString()
        const parsedData = JSON.parse(dataJson)
        parsedData.filter((element)=>{
            console.log(`${i}.`+element.title)
            i += 1
        })
    } catch (e){
        console.log("error in fetching notes")
    }
}
module.exports = {
    getNotes: getNotes ,
    addNote: addNote,
    removeNotes:removeNotes,
    listNotes:listNotes,
    findNote:findNote
}