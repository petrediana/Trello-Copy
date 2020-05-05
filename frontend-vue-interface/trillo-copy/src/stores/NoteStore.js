const SERVER = 'http://localhost:8081/note-api/notes';

class NoteStore {
    constructor() {
        this.notesOfNoteListFromDb = []
    }

    async getNotesOfANoteListFromDb(noteListId) {
        try {
            const request = await fetch(`${SERVER}/that-belong-to/${noteListId}`)
            const response = await request.json();

            response.forEach(note => {
                this.notesOfNoteListFromDb.push({
                    _id: note._id,
                    name: note.name,
                    description: note.description
                })
            })
        } catch(err) {
            console.warn(err)
        }
    }
}

export default NoteStore