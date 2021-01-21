import { TextField, Button, Paper } from '@material-ui/core'
import React, { useState } from 'react'


const NewNoteForm = (props) => {
    const [note, setNote] = useState({
        title: "",
        content: "",
        color: "",
    })

    const change = e => {
        setNote({
            ...note,
            [e.target.name]: e.target.value
        });
      };

    const submit = (e) => {
        e.preventDefault()
        props.noteAdd(note);
        setNote({
            title: "",
            content: "",
            color: "",
        })
    }

    return (
        <Paper>
            <form>
                    <TextField
                        name="title"
                        value={note.title}
                        onChange={e => change(e)}
                        
                    />
                    <br />
                    <TextField
                        name="content"
                        value={note.content}
                        onChange={e => change(e)}
                        
                    />
                    <br />
                    <Button label="Submit" onClick={e => submit(e)}>Add Note</Button>
            </form>
        </Paper>
    )
}

export default NewNoteForm
