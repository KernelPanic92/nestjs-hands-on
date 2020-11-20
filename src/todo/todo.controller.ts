import { TodoDto } from './dto/todo.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { TodoService } from './services/todo/todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todos')
export class TodoController {
  public constructor(private readonly todoService: TodoService) {}

  @Post()
  public create(@Body() createTodoDto: CreateTodoDto): Promise<TodoDto> {
    return null;
  }

  @Get()
  public findAll(): Promise<TodoDto[]> {
    return null;
  }

  @Get(':id')
  public findOne(@Param('id') id: string): Promise<TodoDto> {
    return null;
  }

  @Put(':id')
  public update(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
  ): Promise<TodoDto> {
    return null;
  }

  @Delete(':id')
  public remove(@Param('id') id: string): Promise<TodoDto> {
    return null;
  }
}
