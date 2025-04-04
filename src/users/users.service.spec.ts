import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ConflictException, NotFoundException } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;
  let repo: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repo = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('throws conflict if email already exists', async () => {
      jest.spyOn(repo, 'findOneBy').mockResolvedValueOnce({} as User);
      await expect(
        service.create({ email: 'test@test.com', password: '123456' }),
      ).rejects.toThrow(ConflictException);
    });

    it('creates a user successfully', async () => {
      jest.spyOn(repo, 'findOneBy').mockResolvedValueOnce(null);
      jest.spyOn(repo, 'create').mockReturnValueOnce({ id: 1 } as User);
      jest.spyOn(repo, 'save').mockResolvedValueOnce({ id: 1 } as User);

      const result = await service.create({
        email: 'test@test.com',
        password: '123456',
      });
      expect(result).toEqual({ id: 1 });
    });
  });

  describe('findOne', () => {
    it('throws NotFoundException if user does not exist', async () => {
      jest.spyOn(repo, 'findOneBy').mockResolvedValueOnce(null);
      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });
});
