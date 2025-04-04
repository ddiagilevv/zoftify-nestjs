import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../src/user/user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../src/user/user.entity';
import { Repository } from 'typeorm';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('UserService', () => {
  let service: UserService;
  let repo: Repository<User>;

  const userArray = [
    { id: 1, email: 'test1@example.com', password: '123456', name: 'Test1' },
    { id: 2, email: 'test2@example.com', password: 'abcdef', name: 'Test2' },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: jest.fn().mockResolvedValue(userArray),
            findOne: jest.fn(),
            create: jest.fn().mockReturnValue(userArray[0]),
            save: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repo = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = await service.findAll();
      expect(users).toEqual(userArray);
    });
  });

  describe('findOne', () => {
    it('should return a single user if found', async () => {
      (repo.findOne as jest.Mock).mockResolvedValue(userArray[0]);
      const user = await service.findOne(1);
      expect(user).toEqual(userArray[0]);
    });

    it('should throw NotFoundException if user not found', async () => {
      (repo.findOne as jest.Mock).mockResolvedValue(null);
      await expect(service.findOne(99)).rejects.toThrow(NotFoundException);
    });
  });

  describe('createUser', () => {
    it('should create and return a user', async () => {
      (repo.findOne as jest.Mock).mockResolvedValue(null); // no existing email
      (repo.save as jest.Mock).mockResolvedValue(userArray[0]);
      const created = await service.createUser({
        email: 'test1@example.com',
        password: '123456',
        name: 'Test1',
      });
      expect(created).toEqual(userArray[0]);
    });

    it('should throw BadRequestException if email in use', async () => {
      (repo.findOne as jest.Mock).mockResolvedValue(userArray[0]);
      await expect(
        service.createUser({
          email: 'test1@example.com',
          password: '123456',
          name: 'Test1',
        }),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
