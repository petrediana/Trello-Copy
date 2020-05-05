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
                this.noteListsFromDb.push({
                    _id: noteList._id,
                    name: noteList.name
                })
            })
        } catch(err) {
            console.warn(err);
        }
    }
}

export default NoteListStore