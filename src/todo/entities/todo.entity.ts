import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// TODO: map as Entity with table name 'todos'. see https://docs.nestjs.com/techniques/database#repository-pattern
export class Todo {

  // TODO: map attribute id as primary key with autoincrement. see https://docs.nestjs.com/techniques/database#repository-pattern
  // TODO: specify 'id' name. see https://docs.nestjs.com/techniques/database#repository-pattern
  public id: number;

  // TODO: map attribute to 'title' column. see https://docs.nestjs.com/techniques/database#repository-pattern
  public title: string;

  @Column({ name: 'completed' })
  public completed: boolean;

  public constructor(title: string) {
    this.title = title;
    this.completed = false;
  }
}
