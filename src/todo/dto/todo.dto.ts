export class TodoDto {
  public id: number;
  public title: string;
  public completed: boolean;

  public constructor(opts?: Partial<TodoDto>) {
    Object.assign(this, opts);
  }
}
