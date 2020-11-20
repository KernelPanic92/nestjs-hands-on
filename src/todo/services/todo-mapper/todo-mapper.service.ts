import { Injectable } from '@nestjs/common';
import { TodoDto } from '../../dto';
import { Todo } from '../../entities/todo.entity';

@Injectable()
export class TodoMapperService {
  public modelToDto({ id, title, completed }: Todo): TodoDto {
    return new TodoDto({ id, title, completed });
  }
}
