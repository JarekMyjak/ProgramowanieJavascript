const key = 'NoteApp'

const ls = {
    getNotes: () => {
        const ret = JSON.parse(localStorage.getItem(key))
        return ret != null ? ret : []
    },

    setNotes: (notes) => {
        return localStorage.setItem(key, JSON.stringify(notes));
    },
}

export default ls
