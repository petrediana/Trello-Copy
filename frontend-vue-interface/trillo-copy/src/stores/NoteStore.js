const SERVER = 'http://localhost:8081/note-api/notes';

class NoteStore {
    constructor() {
        this.notesOfNoteListFromDb = []
        this.createdNoteId = []
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
            const request = await fetch(`${SERVER}`, {
                                method: 'post',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(note)
                            })
            const response = await request.json()
            this.createdNoteId = response.createdNote._id
            return response.createdNote._id
        } catch(err) {
            console.warn(err)
            return undefined
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

    async updateNoteFromDb(noteId, newName, newDescription) {
        try {
            const requestBody = [
                { "propName": "name", "value": newName },
                { "propName": "description", "value": newDescription }
            ]

            await fetch(`${SERVER}/${noteId}`, {
                method: 'patch',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            })

        } catch(err) {
            console.warn(err)
        }
    }
}

export default NoteStore