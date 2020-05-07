const SERVER = 'http://localhost:8081/notelist-api/notelists';

class NoteListStore {
    constructor() {
        this.boardNoteListFromDb = []
    }

    async getBoardNoteListsFromDb(boardId) {
        try {
            const request = await fetch(`${SERVER}/that-belong-to/${boardId}`)
            const response = await request.json()

            response.forEach(noteList => {
                this.boardNoteListFromDb.push({
                    _id: noteList._id,
                    name: noteList.name
                })
            })
        } catch(err) {
            console.warn(err);
        }
    }

    async addNoteListToDb(noteList) {
        try {
            const request = await fetch(`${SERVER}`, {
                                method: 'post',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(noteList)
                            })
            const response = await request.json()
            this.createdNoteId = response.createdNote._id
            return response.createdNoteList._id
        } catch(err) {
            console.warn(err)
            return undefined
        }
    }
}

export default NoteListStore