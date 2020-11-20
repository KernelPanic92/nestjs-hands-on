import { Module } from '@nestjs/common';
import { TodoService } from './services/todo/todo.service';
import { TodoController } from './todo.controller';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { Todo } from './entities/todo.entity';
import { TodoMapperService } from './services/todo-mapper/todo-mapper.service';

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  controllers: [TodoController],
  providers: [TodoService, TodoMapperService],
})
export class TodoModule {}
