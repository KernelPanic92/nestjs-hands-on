import { TodoDto } from './dto/todo.dto';
import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  public create(createTodoDto: CreateTodoDto): TodoDto {
    return 'This action adds a new todo';
  }

  public findAll() {
    return `This action returns all todo`;
  }

  public findOne(id: number): TodoDto {
    return `This action returns a #${id} todo`;
  }

  public update(id: number, updateTodoDto: UpdateTodoDto): TodoDto {
    return `This action updates a #${id} todo`;
  }

  public remove(id: number): TodoDto {
    return `This action removes a #${id} todo`;
  }
}
