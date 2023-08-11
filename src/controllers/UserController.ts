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
    if (!user.name || !user.email || !user.password){
        return res.status(400).json({ message: 'Bad request: invalid params' })
    }
    this.userService.createUser(user.name, user.email, user.password)
    return res.status(201).json({ message: "User created" });
  };

  getUser = (req: Request, res: Response) => {
    return res.status(200)
  }

  deleteUser = (req: Request, res: Response) => {
    const user = req.body
    console.log('Deleting user: ', user)
    return res.status(200).json({ message: 'User deleted' })
  }
}