export class UpdateTodoDto {
  public title: string;
  public completed: boolean;

  public constructor(opts?: Partial<UpdateTodoDto>) {
    Object.assign(this, opts);
  }
}
