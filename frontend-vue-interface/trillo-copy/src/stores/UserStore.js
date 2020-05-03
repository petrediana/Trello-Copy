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
}

export default UserStore