import { UserService } from "./UserService"

jest.mock('../repositories/UserRepository')
jest.mock('../database', () => {
     initialize: jest.fn()
})
const mockUserRepository = require('../repositories/UserRepository')

describe('UserService', () => {
     const userService = new UserService(mockUserRepository)

     it('Deve adicionar um novo usuario', async () => {
          mockUserRepository.createUser = jest.fn().mockImplementation(() => Promise.resolve({
               id_user: '1234560',
               name: 'Gabriel',
               email: 'gabriel@test.com',
               password: '12345'
          }))
          const response = await userService.createUser('Gabriel', 'gabriel@test.com', '12345');
          expect(mockUserRepository.createUser).toHaveBeenCalled()
          expect(response).toMatchObject({
               id_user: '1234560',
               name: 'Gabriel',
               email: 'gabriel@test.com',
               password: '12345'
          })
   })
})