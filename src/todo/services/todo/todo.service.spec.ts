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
    repository.save.mockReturnValue(Promise.resolve(new Todo('title')));

    await service.create(new CreateTodoDto({ title: 'title' }));

    expect(repository.save).toBeCalledTimes(1);
  });

  it('should find all todos', async () => {
    repository.find.mockReturnValue(Promise.resolve([]));

    await service.findAll();

    expect(repository.find).toBeCalledTimes(1);
  });

  it('should find one', async () => {
    repository.findOne.mockReturnValue(Promise.resolve(new Todo('title')));

    await service.findOne(1);

    expect(repository.findOne).toBeCalledTimes(1);
  });

  it('should throws error when todo not exists', async () => {
    repository.findOne.mockReturnValue(Promise.resolve(null));

    await expect(service.findOne(1)).rejects.toThrow();
  });

  it('should update todo', async () => {
    const todo = new Todo('title');
    repository.findOne.mockReturnValue(Promise.resolve(todo));
    repository.save.mockReturnValue(todo);

    await service.update(1, new UpdateTodoDto());

    expect(repository.save).toBe(1);
  });

  it('should delete todo', async () => {
    const todo = new Todo('title');
    repository.findOne.mockReturnValue(Promise.resolve(todo));
    repository.remove.mockReturnValue(Promise.resolve(todo));

    await service.remove(1);

    expect(repository.remove).toBe(1);
  });

  it('should throws exception when todo not exists on remove', async () => {
    repository.findOne.mockReturnValue(Promise.resolve(null));

    await expect(service.remove(1)).rejects.toThrow();
  });
});
