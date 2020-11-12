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

const pushNotesToStorage = (notes) => {

}

const getNotesFromStorage = (key) => {
    const n = JSON.parse(localStorage.getItem(key))
    n.map((note) => {
        note.createDate = new Date(note.createDate)
    })
}

const renderNote = (note) => {
    document.createElement('div')

    


}