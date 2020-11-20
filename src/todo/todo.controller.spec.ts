import { Test, TestingModule } from '@nestjs/testing';
import { todoServiceMockFactory } from '../../test/mock/todo.service.mock';
import { MockType } from '../../test/utils/mock-type.mock';
import { CreateTodoDto, UpdateTodoDto } from './dto';
import { TodoService } from './services/todo/todo.service';
import { TodoController } from './todo.controller';

describe('TodoController', () => {
  let controller: TodoController;
  let service: MockType<TodoService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [
        {
          provide: TodoService,
          useFactory: todoServiceMockFactory,
        },
      ],
    }).compile();

    service = (module.get<TodoService>(
      TodoService,
    ) as unknown) as MockType<TodoService>;

    controller = module.get<TodoController>(TodoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create todo', async () => {
    await controller.create(new CreateTodoDto());

    expect(service.create).toBeCalledTimes(1);
  });

  it('should find one todo', async () => {
    await controller.findOne('1');

    expect(service.findOne).toBeCalledTimes(1);
  });

  it('should find all todos', async () => {
    await controller.findAll();

    expect(service.findAll).toBeCalledTimes(1);
  });

  it('should update todo', async () => {
    await controller.update('1', new UpdateTodoDto());

    expect(service.update).toBeCalledTimes(1);
  });

  it('should remove todo', async () => {
    await controller.remove('1');

    expect(service.remove).toBeCalledTimes(1);
  });
});
