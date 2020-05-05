const SERVER = 'http://localhost:8081/board-api/boards'

class BoardStore {
    constructor() {
        this.userAllBoardsFromDb = [],
        this.userAllStarredBoardsFromDb = []
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

    async getAllStarredBoardsForUser(userId) {
        try {
            const request = await fetch(`${SERVER}/starred/${userId}`)
            const response = await request.json();

            response.forEach(userStarredBoard => {
                this.userAllStarredBoardsFromDb.push({
                    _id: userStarredBoard._id,
                    starred: userStarredBoard.starred,
                    description: userStarredBoard.description
                })
            })
        } catch(err) {
            console.warn(err)
        }
    }
}

export default BoardStore