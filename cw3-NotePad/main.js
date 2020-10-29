const notes = []
const lsKey = 'notes'

const note = {
    title: 'notatka',
    content: 'notatka notatka notatka',
    colour: '#ffffff',
    pinned: false,
    createDate: new Date()
}

notes.push(note)
notes.push(note)
notes.push(note)

localStorage.setItem(lsKey, JSON.stringify(notes))

const notesFromLocalStorage = JSON.parse(localStorage.getItem(lsKey))