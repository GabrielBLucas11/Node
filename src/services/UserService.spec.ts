import { UserService } from "./UserService"
import * as jwt from 'jsonwebtoken'

jest.mock('../repositories/UserRepository')
jest.mock('../database', () => {
     initialize: jest.fn()
})
jest.mock('jsonwebtoken')

const mockUserRepository = require('../repositories/UserRepository')
const mockUser = {
     id_user: '123456',
     name: 'Gabriel',
     email: 'gabriel@test.com',
     password: '123456'
}

describe('UserService', () => {
     const userService = new UserService(mockUserRepository)

     it('Deve adicionar um novo usuario', async () => {
          mockUserRepository.createUser = jest.fn().mockImplementation(() => Promise.resolve(mockUser))
          const response = await userService.createUser('Gabriel', 'gabriel@test.com', '123456');
          expect(mockUserRepository.createUser).toHaveBeenCalled()
          expect(response).toMatchObject({
               id_user: '123456',
               name: 'Gabriel',
               email: 'gabriel@test.com',
               password: '123456'
          })
   })

   it ('Devo retornar um token de usuario',async () => {
     jest.spyOn(userService, 'getAuthenticatedUser').mockImplementation(() => Promise.resolve(mockUser))
     jest.spyOn(jwt, 'sign').mockImplementation(() => 'token')
     const token = await userService.getToken('gabriel@teste.com', '123456')
     expect(token).toBe('token')
   })

   it('Deve retornar um erro caso não encontre um usuario', async () => {
          jest.spyOn(userService, 'getAuthenticatedUser').mockImplementation(() => Promise.resolve(null))
          await expect(userService.getToken('invalid@teste.com', '123456')).rejects.toThrowError(new Error('Email or password invalid'))
   })
})