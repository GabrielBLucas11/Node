import { UserService } from "../services/UserService";
import { UserController } from "./UserController";
import { makeMockResponse } from "../__Mocks__/mockResponse.mock";
import { Request } from "express";

describe('UserController', () => {
    const mockUserService: Partial<UserService> = {
        createUser: jest.fn(),
        getAllUsers: jest.fn()
    }
    const userController = new UserController(mockUserService as UserService);

    it('Deve adicionar um novo usuario', () => {
        const mockRequest = {
            body: {
                name: 'Gabriel',
                email: "gabriel@teste.com"
            }
        } as Request;
        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(201)
        expect(mockResponse.state.json).toMatchObject({ message: "User created" })
    })

    it('Deve dar erro caso o usuário não informe o nome', () => {
        const mockRequest = {
            body: {
                email: 'gabriel@teste.com'
            }
        } as Request;
        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request: name or email invalid' })
    })
    
    it('Deve dar erro caso o usuário não informe o email', () => {
        const mockRequest = {
            body: {
                nome: 'Gabriel'
            }
        } as Request;
        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request: name or email invalid' })
    })

    it('Deve chamar a função GetAllUsers', () => {
        const mockRequest = {
            body: {
                name: 'Gabriel',
                email: "gabriel@teste.com"
            }
        } as Request;
        const mockResponse = makeMockResponse()
        userController.getAllUsers(mockRequest, mockResponse)
        expect(mockUserService.getAllUsers).toBeCalled()
        expect(mockResponse.state.status).toBe(200)
        
    })

    it("Deve deletar um usuário", () => {
      const mockRequest = {
        body: {
          name: "Gabriel",
          email: "gabriel@teste.com",
        },
      } as Request;
      const mockResponse = makeMockResponse();
      userController.deleteUser(mockRequest, mockResponse);
      expect(mockResponse.state.status).toBe(200);
      expect(mockResponse.state.json).toMatchObject({ message: "User deleted" });
    })
}) 