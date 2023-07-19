const db = [
    {
        name: "Jao",
        email: "jao@example.com",
    }
]

export class UserService {
    createUser = (name: string, email: string) => {
        const user = {
            name,
            email
        }
        db.push(user)
        console.log('DB atualizado', db)
    }

    getAllUsers = () => {
        return db
    }
}