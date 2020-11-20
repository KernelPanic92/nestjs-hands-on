import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTodoDto, TodoDto, UpdateTodoDto } from 'src/todo/dto';
import { Todo } from '../../entities/todo.entity';
import { Repository } from 'typeorm';
import { TodoMapperService } from '../todo-mapper/todo-mapper.service';

@Injectable()
export class TodoService {
  public constructor(
    @InjectRepository(Todo) private readonly repository: Repository<Todo>,
    private readonly mapper: TodoMapperService,
  ) {}

  public async create(createTodoDto: CreateTodoDto): Promise<TodoDto> {
    const { title } = createTodoDto;
    let todo = new Todo(title);
    todo = await this.repository.save(todo);
    return this.mapper.modelToDto(todo);
  }

  public async findAll(): Promise<TodoDto[]> {
    const todos = await this.repository.find();
    return todos.map(this.mapper.modelToDto);
  }

  public async findOne(id: number): Promise<TodoDto> {
    const todo = await this.repository.findOne(id);
    if (!todo) throw new NotFoundException();
    return this.mapper.modelToDto(todo);
  }

  public async update(
    id: number,
    updateTodoDto: UpdateTodoDto,
  ): Promise<TodoDto> {
    let todo = await this.repository.findOne(id);

    if (!todo) throw new NotFoundException();

    const { title, completed } = updateTodoDto;

    todo.completed = completed;
    todo.title = title;

    todo = await this.repository.save(todo);

    return this.mapper.modelToDto(todo);
  }

  public async remove(id: number): Promise<TodoDto> {
    let todo = await this.repository.findOne(id);

    if (!todo) throw new NotFoundException();

    todo = await this.repository.remove(todo);

    return todo;
  }
}
