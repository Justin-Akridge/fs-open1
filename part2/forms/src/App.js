import { useState, useEffect } from "react";
//import  Person from "./components/Person"
import Note from "./components/Note"
import axios from "axios";

const App = () => {
  const [ notes, setNotes ] = useState([])
  const [ newNote, setNewNote ] = useState('')
  const [ showAll, setShowAll ] = useState(true)

  const notesToShow = showAll 
    ? notes 
    : notes.filter(note => note.important)
    
  const addNote = (e) => {
    e.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < .5,
    }
    axios
      .post('http://localhost:3001/notes', noteObject)
      .then(response => {
        setNotes(notes.concat(noteObject))
        setNewNote('')
        console.log(response)
      })
    
  }

  const handleNoteChange = (e)  => {
    setNewNote(e.target.value)
  }

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note=> {
          return (
            <Note key={note.id} note={note} />)}
          )
        }
      </ul>
      <form onSubmit={addNote}>
        <input 
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>
    </div>
  );
}

export default App;



// add names
// const [persons, setPersons] = useState([]) 
// const [newName, setNewName] = useState('')
// //add numbers
// const [numbers, setNumbers] = useState([])
// const [newNumber, setNewNumber] = useState('')
  
//   useEffect(() => {
//     axios
//       .get('http://localhost:3001/persons')
//       .then(response => {
//         console.log(response)
//         setPersons(response.data)
//       })
//   },[])

  // const addNumber = (e) => {
  //   e.preventDefault()
  //   const numberobj = {
  //     number: newNumber,
  //     id: numbers.length + 1,
  //   }
  //   setNumbers(numberobj)
  //   setNewNumber('')
  // }

  // const handleNumber = (e) => {
  //   setNewNumber(e.target.value)
  // }

  // const addPerson = (e) => {
  //   e.preventDefault()
  //   console.log(e.target.value)
  //   if(e.target.value === undefined){
  //     return 
  //   }
  //   const personobj = {
  //     name: newName,
  //     id: persons.length + 1,
  //   }
    
  //   const isDuplicate = (name) => {
  //     for (let i=0; i<persons.length; i++) {
  //       if(persons[i].name === name){
  //         return true
  //       }
  //     }
  //     return false
  //   }
  //   if(isDuplicate(newName)){
  //     alert(`${newName} already exists`)
  //     setNewName('')
  //   }
  //   else{
  //     console.log(newName)
  //     setPersons(persons.concat(personobj))
  //     setNewName('')
  //   }
  //   axios
  //     .post('http://localhost:3001/persons', personobj)
  //     .then(response => {
  //       console.log(response)
  //     })
  // }

  // const handlePerson = (e) => {
  //   setNewName(e.target.value)
  // }


  // return (
  //   <div>
  //     <h2>Phonebook</h2>
  //     <form onSubmit={addPerson}>
  //       <div>
  //         name: <input value={newName} onChange={handlePerson} />
  //       </div>
  //       <div>
  //        {/* number: <input value={newNumber} onChange={handleNumber} /> */}
  //       </div>
  //       <button type="submit">add</button>
  //     </form>
  //     <h2>Numbers</h2>
      
  //       {persons.map(person => {
  //         return(
  //           <Person key={person.id} person={person} />
  //         )
  //       })}
      
  //   </div>
  // )