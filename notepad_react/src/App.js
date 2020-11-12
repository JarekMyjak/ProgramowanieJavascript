import './App.css';
import 'fontsource-roboto';
import Note from './components/Note';
import NewNoteForm from './components/NewNoteForm';
import { Container, Grid } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import ls from './helpers/localStorage'


const App = () => {
  const [noteList, setNoteList] = useState([])
  
  // useState([
  //   {
  //     id: 0,
  //     title: "tytuł",
  //     content: "miejsce na pisanie",
  //     pinned: true,
  //     createdAt: Date.now()
  //   },
  //   {
  //     id: 1,
  //     title: "tytułAAAAAAAAAA",
  //     content: "miejsce na pisanie",
  //     pinned: true,
  //     createdAt: Date.now()
  //   },
  //   {
  //     id: 2,
  //     title: "tytuł",
  //     content: "miejsce na pisanie",
  //     pinned: true,
  //     createdAt: Date.now()
  //   },
  //   {
  //     id: 3,
  //     title: "dupa",
  //     content: "test",
  //     pinned: false,
  //     createdAt: Date.now()
  //   },
  //   {
  //     id: 4,
  //     title: "napisać na zajęcia więcej kodu",
  //     content: "ilość",
  //     pinned: true,
  //     createdAt: Date.now()
  //   }
  // ]
  // )

  

  useEffect(() => {

    ls.setNotes(noteList)
    console.log(ls.getNotes())
    

    return () => {
      
    }
  }, [noteList, setNoteList])

  const onPinChange = (id, isPinned) => {
    const newNoteList = noteList.map((note, key)=>{
      note.pinned = note.id === id ? isPinned : note.pinned;
      return note
    })
    //newNoteList[id].pinned = isPinned
    setNoteList(newNoteList)
  }

  const onColorChange = (id, newColor) => {
    const newNoteList = noteList.map((note, key)=>{
      note.color = note.id === id ? newColor : note.color;
      return note
    })
    setNoteList(newNoteList)
  }

  const noteDelete = (id) => {
    const newNoteList = noteList.filter((element)=>{
      return element.id !== id
    },id)
    setNoteList(newNoteList)
  }

  const noteAdd = (note) => {
    note.pinned = false
    note.color = '#000'
    note.createdAt = Date.now()
    note.id = noteList.length
    setNoteList([...noteList , note])
  }


  return (
    <div className="App">
      <Container>
        <NewNoteForm noteAdd={noteAdd}/>
        <Grid container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={3}
        >

          {noteList.map((n) => {
            return (<Note key={n.id} noteObj={n} onPinChange={onPinChange} onColorChange={onColorChange} onDelete={noteDelete} />)
          })}

        </Grid>
      </Container>
    </div>
  )
};

export default App
