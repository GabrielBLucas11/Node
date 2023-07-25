import { Request, Response } from "express"
import { UserService } from "../services/UserService";

export class UserController {
  userService: UserService

  constructor(
    userService = new UserService()
  ) {
    this.userService = userService
  }

  createUser = (req: Request, res: Response) => {
    const user = req.body;
    if (!user.name || !user.email){
        return res.status(400).json({ message: 'Bad request: name or email invalid' })
    }
    this.userService.createUser(user.name, user.email)
    return res.status(201).json({ message: "User created" });
  };

  getAllUsers = (req: Request, res: Response) => {
    const users = this.userService.getAllUsers()

    return res.status(200).json( users )
  }

  deleteUser = (req: Request, res: Response) => {
    const user = req.body
    console.log('Deleting user: ', user)
    return res.status(200).json({ message: 'User deleted' })
  }
}