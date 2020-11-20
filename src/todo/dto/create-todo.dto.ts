export class CreateTodoDto {
  public title: string;

  public constructor(args?: Partial<CreateTodoDto>) {
    Object.assign(this, args);
  }
}
