import React from "react"
import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"
import Split from "react-split"
// import { nanoid } from "nanoid"
import { onSnapshot, addDoc, doc, deleteDoc, setDoc } from "firebase/firestore"
import { notesCollection, db } from "./firebase"

export default function App() {
    const [notes, setNotes] = React.useState([]) // Create an empty array as the default value for notes
    const [currentNoteId, setCurrentNoteId] = React.useState("") // Create an empty string as the default value
    const [tempNoteText, setTempNoteText] = React.useState("") // Create an empty string as the default value
    const currentNote = 
        notes.find(note => note.id === currentNoteId) 
        || notes[0]                           // If currentNoteId is not found, use the first note in the array

    // Sort the notes array by updatedAt property, most recent first
    const sortedNotes = notes.sort((a, b) => b.updatedAt - a.updatedAt)

    React.useEffect(() => {
        const unsubscribe = onSnapshot(notesCollection, function(snapshot) {
            // Sync up our local notes array with the snapshot data from Firebase
            const notesArr = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }))
            setNotes(notesArr)
        })
        return unsubscribe
    }, [])

    React.useEffect(() => {
        if (!currentNoteId) {
            setCurrentNoteId(notes[0]?.id)      // If currentNoteId is empty, set it to the first note in the array
        }
    }, [notes]) 

    React.useEffect(() => {
        if (currentNote) {
            setTempNoteText(currentNote.body)   // Set the tempNoteText to the currentNote's body
        }
    }
    , [currentNote])        // Run this effect whenever the currentNote changes 

    // Create an effect that runs whenever the tempNoteText changes
    // Delay the sending of the request to Firebase by 0.5 seconds
    // This is called 'debouncing' the effect
    // Uses setTimeout
    // Uses clearTimeout to cancel the previous setTimeout
    React.useEffect(() => {
            const timeoutId = setTimeout(() => {          // Delay the sending of the request to Firebase by 1 second
                if (tempNoteText !== currentNote.body) {    // so that we don't send a request to Firebase every time 
                updateNote(tempNoteText)                    // the user types a character (default was 0.5 sec).     
                }                                           // Also, only send the request if the note has changed
            }, 1000)                                        // so if tempNoteText is not the same as currentNote.body
            return () => clearTimeout(timeoutId)
    }, [tempNoteText])

    async function createNewNote() {
        const newNote = {
            body: "# Type your markdown note's title here",
            createdAt: Date.now(), // Add createdAt property
            updatedAt: Date.now() // Add updatedAt property
        }
        const newNoteRef = await addDoc(notesCollection, newNote)
        setCurrentNoteId(newNoteRef.id)
    }
     
    async function updateNote (text) {      // Update the note in the database using async/await because it's an asynchronous operation
        const docRef = doc(db, "notes", currentNoteId)
        await setDoc(
            docRef, 
            { body: text, updatedAt: Date.now() }, 
            { merge: true }
        )
    }

    async function deleteNote(noteId) {
        const docRef = doc(db, "notes", noteId)
        await deleteDoc(docRef)
    }

    return (
        <main>
            {notes.length > 0 ? (
                <Split sizes={[30, 70]} direction="horizontal" className="split">
                    <Sidebar
                        notes={sortedNotes}
                        currentNote={currentNote}
                        setCurrentNoteId={setCurrentNoteId}
                        newNote={createNewNote}
                        deleteNote={deleteNote}
                    />
                    <Editor
                        tempNoteText={tempNoteText}
                        setTempNoteText={setTempNoteText}
                    />
                </Split>
            ) : (
                <div className="no-notes">
                    <h1>You have no notes</h1>
                    <button className="first-note" onClick={createNewNote}>
                        Create one now
                    </button>
                </div>
            )}
        </main>
    )
}
