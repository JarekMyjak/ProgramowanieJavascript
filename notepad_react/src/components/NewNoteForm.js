import { TextField, Button } from '@material-ui/core'
import React, { useState } from 'react'


const NewNoteForm = (props) => {
    const [note, setNote] = useState({
        title: "",
        content: "",
        color: "",
    })

    const change = e => {
        // this.props.onChange({ [e.target.name]: e.target.value });
        setNote({
            ...note,
            [e.target.name]: e.target.value
        });
        console.log(note)
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
        <div>
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
                    <Button label="Submit" onClick={e => submit(e)}>aaa</Button>
            </form>
        </div>
    )
}

export default NewNoteForm
