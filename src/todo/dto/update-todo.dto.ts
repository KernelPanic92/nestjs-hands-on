import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';

export class UpdateTodoDto {
  @IsString()
  @IsNotEmpty()
  public title: string;

  @IsBoolean()
  public completed: boolean;

  public constructor(opts?: Partial<UpdateTodoDto>) {
    Object.assign(this, opts);
  }
}
