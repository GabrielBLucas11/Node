import { UserService } from "../services/UserService";
import { UserController } from "./UserController";
import { makeMockResponse } from "../__Mocks__/mockResponse.mock";
import { Request } from "express";
import { makeMockRequest } from "../__Mocks__/mockRequest.mock";

const mockUserService = {
    createUser: jest.fn(),
    getUser: jest.fn(),
}

jest.mock('../services/UserService', () => {
    return {
        UserService: jest.fn().mockImplementation(() => {
            return mockUserService
        })
    }
})

describe('UserController', () => {
    
    const userController = new UserController();
    const mockResponse = makeMockResponse()


    it('Deve adicionar um novo usuario', () => {
        const mockRequest = {
            body: {
                name: 'Gabriel',
                email: "gabriel@teste.com",
                password: 'password'
            }
        } as Request;
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(201)
        expect(mockResponse.state.json).toMatchObject({ message: "User created" })
    })

    it('Deve dar erro caso o usuário não informe o nome', () => {
        const mockRequest = {
            body: {
                nome: '',
                email: 'email@teste.com',
                password: 'password'
            }
        } as Request;
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request: invalid params' })
    })
    
    it('Deve dar erro caso o usuário não informe o email', () => {
        const mockRequest = {
            body: {
                nome: 'Gabriel',
                email: '',
                password: 'password'
            }
        } as Request;
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request: invalid params' })
    })

    it('Deve dar erro caso o usuário não informe o password', () => {
        const mockRequest = {
            body: {
                name: 'Gabriel',
                email: "gabriel@teste.com",
                password: ''
            }
        } as Request;
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request: invalid params' })
    })

    it("Deve deletar um usuário", () => {
      const mockRequest = {
        body: {
          name: "Gabriel",
          email: "gabriel@teste.com",
          password: 'password'
        },
      } as Request;
      userController.deleteUser(mockRequest, mockResponse);
      expect(mockResponse.state.status).toBe(200);
      expect(mockResponse.state.json).toMatchObject({ message: "User deleted" });
    })

    it('Deve retornar o usuário com o userId informado', () => {
        const mockRequest = makeMockRequest({
            params: {
                userId: '123456',
            }
        })

        userController.getUser(mockRequest, mockResponse);
        expect(mockUserService.getUser).toHaveBeenCalledWith('123456')
        expect(mockResponse.state.status).toBe(200);
    })
}) 