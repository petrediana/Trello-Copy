const SERVER = 'http://localhost:8081/user-api/users';

class UserStore {
    constructor() {
        this.usersFromDb = []
    }

    async getUsersFromDb() {
        try {
            const request = await fetch(`${SERVER}`)
            const response = await request.json()

            response.forEach(user => {
                this.usersFromDb.push({
                    _id: user._id,
                    name: user.name,
                    pass: user.pass
                })
            })
        } catch(err) {
            console.warn(err)
        }
    }

    async addUserToDb(user) {
        try {
            const request = await fetch(`${SERVER}`, {
                                method: 'post',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(user)
                            })
            const response = await request.json()
            return response.createdUser._id
        } catch(err) {
            console.warn(err)
            return undefined
        }
    }
}

export default UserStore