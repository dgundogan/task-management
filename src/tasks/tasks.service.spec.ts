import { Test, TestingModule } from '@nestjs/testing';
import { User } from 'src/auth/user.entity';
import { TaskRepository } from './task.repository';
import { TasksService } from './tasks.service';

const mockTaskRepository = () => ({
  getTasks: jest.fn(),
});

const mockUser: User = {
  username: 'test',
  id: '111',
  password: 'somepass',
  tasks: [],
};

describe('TasksService', () => {
  let service: TasksService;
  let repository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TaskRepository, useFactory: mockTaskRepository },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    repository = module.get<TaskRepository>(TaskRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('getTasks', () => {
    it('calls TaskRepository.getTasks and returns the result', async () => {
      repository.getTasks.mockResolvedValue('someValue');

      const result = await service.getTask(null, mockUser);

      expect(repository.getTasks).toHaveBeenCalled();
      expect(result).toEqual('someValue');
    });
  });
});
