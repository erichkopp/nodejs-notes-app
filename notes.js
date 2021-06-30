const chalk = require('chalk')
const fs = require('fs')


const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })        
        saveNotes(notes)
        console.log(chalk.green('New note added!'))
    } else {
        console.log(chalk.red('Note title already exists!'))
    }
}


const removeNote = (title) => {
    const notes = loadNotes()
    const returnAllOtherNotes = notes.filter((note) => note.title !== title)
    
    if (notes.length > returnAllOtherNotes.length) {
        saveNotes(returnAllOtherNotes)
        console.log(chalk.green('Note removed!'))
    } else {
        console.log(chalk.red('Note title not found!'))
    }
}


const listNotes = () => {
    const notes = loadNotes()

    console.log(chalk.cyan('Your notes:'))
    
    notes.forEach((note) => (
        console.log(`    ${note.title}`)
    ))
}


const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)

    if (note) {
        console.log(chalk.bold.inverse(note.title))
        console.log(note.body)
    } else {
        console.log(chalk.red('Note title not found!'))
    }
}


const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}


const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch(e) {
        return []
    }
}


module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}