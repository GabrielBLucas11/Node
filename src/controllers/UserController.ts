import { Request, Response, request } from "express"
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

  getUser = async (req: Request, res: Response) => {
    const { userId } = req.params
    const user = await this.userService.getUser(userId)
    return res.status(200).json({
      userId: user?.id_user,
      name: user?.name,
      email: user?.email,
    })
  }

  deleteUser = (req: Request, res: Response) => {
    const user = req.body
    console.log('Deleting user: ', user)
    return res.status(200).json({ message: 'User deleted' })
  }
}