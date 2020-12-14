import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  public title: string;

  public constructor(args?: Partial<CreateTodoDto>) {
    Object.assign(this, args);
  }
}
