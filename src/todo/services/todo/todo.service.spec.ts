import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Todo } from '../../entities/todo.entity';
import {
  MockType,
  repositoryMockFactory,
} from '../../../../test/utils/repository.mock';
import { Repository } from 'typeorm';
import { TodoMapperService } from '../todo-mapper/todo-mapper.service';
import { TodoService } from './todo.service';
import { CreateTodoDto, UpdateTodoDto } from '../../dto';

describe('TodoService', () => {
  let service: TodoService;
  let repository: MockType<Repository<Todo>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodoService,
        TodoMapperService,
        {
          provide: getRepositoryToken(Todo),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();
    repository = (module.get<Repository<Todo>>(
      getRepositoryToken(Todo),
    ) as unknown) as MockType<Repository<Todo>>;

    service = module.get<TodoService>(TodoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create todo', async () => {
    let calls = 0;

    repository.save.mockImplementation((value) => {
      calls++;
      return Promise.resolve(value);
    });

    await service.create(new CreateTodoDto({ title: 'title' }));
    expect(calls).toBe(1);
  });

  it('should find all todos', async () => {
    let calls = 0;

    repository.find.mockImplementation(() => {
      calls++;
      return Promise.resolve([]);
    });

    await service.findAll();

    expect(calls).toBe(1);
  });

  it('should find one', async () => {
    let calls = 0;

    repository.findOne.mockImplementation(() => {
      calls++;
      return Promise.resolve(new Todo('title'));
    });

    await service.findOne(1);

    expect(calls).toBe(1);
  });

  it('should throws error when todo not exists', async () => {
    repository.findOne.mockReturnValue(Promise.resolve(null));

    await expect(service.findOne(1)).rejects.toThrow();
  });

  it('should update todo', async () => {
    let calls = 0;

    repository.findOne.mockReturnValue(new Todo('title'));
    repository.save.mockImplementation((value) => {
      calls++;
      return Promise.resolve(value);
    });

    await service.update(1, new UpdateTodoDto());

    expect(calls).toBe(1);
  });

  it('should throws exception when todo not exists', async () => {
    repository.findOne.mockReturnValue(Promise.resolve(null));

    await expect(service.findOne(1)).rejects.toThrow('Not Found');
  });

  it('should delete todo', async () => {
    let calls = 0;

    repository.findOne.mockReturnValue(Promise.resolve(new Todo('title')));
    repository.remove.mockImplementation((value) => {
      calls++;
      return Promise.resolve(value);
    });

    await service.remove(1);
    expect(calls).toBe(1);
  });

  it('should throws exception when todo not exists on remove', async () => {
    repository.findOne.mockReturnValue(Promise.resolve(null));

    await expect(service.remove(1)).rejects.toThrow();
  });
});
