import { TodoDto } from './dto/todo.dto';
import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  public create(createTodoDto: CreateTodoDto): TodoDto {
    return 'This action adds a new todo';
  }

  public findAll(): TodoDto[] {
    return [];
  }

  public findOne(id: number): TodoDto {
    return null;
  }

  public update(id: number, updateTodoDto: UpdateTodoDto): TodoDto {
    return null;
  }

  public remove(id: number): TodoDto {
    return null;
  }
}
