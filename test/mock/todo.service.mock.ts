import { TodoService } from '../../src/todo/services/todo/todo.service';
import { MockType } from '../utils/mock-type.mock';

export const todoServiceMockFactory: () => MockType<TodoService> = jest.fn(
  () => ({
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  }),
);
