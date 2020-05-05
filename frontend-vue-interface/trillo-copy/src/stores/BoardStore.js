const SERVER = 'localhost:8081/board-api/boards'

class BoardStore {
    constructor() {
        this.userAllBoardsFromDb = []
    }

    async getAllBoardsForUser(userId) {
        try {
            const request = await fetch(`${SERVER}/${userId}`)
            const response = await request.json()

            response.forEach(userBoard => {
                this.userAllBoardsFromDb.push({
                    _id: userBoard._id,
                    starred: userBoard.starred,
                    description: userBoard.description
                })
            })
        } catch(err) {
            console.warn(err)
        }
    }
}

export default BoardStore