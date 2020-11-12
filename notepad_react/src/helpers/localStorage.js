const key = 'NoteApp'

const ls = {
    getNotes: () => {
        return JSON.parse(localStorage.getItem(key));
    },

    setNotes: (note) => {
        return localStorage.setItem(key, JSON.stringify(note));
    },
}

export default ls
