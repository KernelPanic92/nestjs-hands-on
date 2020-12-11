import { TodoDto } from '../../dto';
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
import { NotFoundException } from '@nestjs/common';

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

  it('should return TodoDto in find one', async () => {
    repository.findOne.mockReturnValue(Promise.resolve(new Todo('title')));

    const actual = await service.findOne(1);

    expect(actual.constructor).toBe(TodoDto);
  });

  it('should throws error when todo not exists', async () => {
    repository.findOne.mockReturnValue(Promise.resolve(null));
    repository.count.mockReturnValue(Promise.resolve(0));
    repository.findOneOrFail.mockRejectedValue(new Error('fail') as never);

    await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
  });

  it('should update todo', async () => {
    const todo = new Todo('title');
    repository.findOne.mockReturnValue(Promise.resolve(todo));
    repository.save.mockReturnValue(Promise.resolve(todo));

    await service.update(1, new UpdateTodoDto());

    expect(repository.save).toBeCalledTimes(1);
  });

  it('should remove todo', async () => {
    const todo = new Todo('title');
    repository.findOne.mockReturnValue(Promise.resolve(todo));
    repository.remove.mockReturnValue(Promise.resolve(todo));

    await service.remove(1);

    expect(repository.remove).toBeCalledTimes(1);
  });

  it('should return TodoDto in remove', async () => {
    repository.findOne.mockReturnValue(Promise.resolve(new Todo('title')));
    repository.remove.mockReturnValue(Promise.resolve(new Todo('title')));

    const actual = await service.remove(1);

    expect(actual.constructor).toBe(TodoDto);
  });

  it('should throws exception when todo not exists on remove', async () => {
    repository.findOne.mockReturnValue(Promise.resolve(null));
    repository.count.mockReturnValue(Promise.resolve(0));
    repository.findOneOrFail.mockRejectedValue(new Error('fail') as never);

    await expect(service.remove(1)).rejects.toThrow(NotFoundException);
  });
});
