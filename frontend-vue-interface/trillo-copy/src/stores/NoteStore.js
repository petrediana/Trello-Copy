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

    async addNoteToDb(note) {
        try {
            await fetch(`${SERVER}`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(note)
            })
        } catch(err) {
            console.warn(err)
        }
    }

    async deleteNoteFromDb(noteId) {
        try {
            await fetch(`${SERVER}/${noteId}`, {
                method: 'delete'
            })
        } catch(err) {
            console.warn(err)
        }
    }
}

export default NoteStore