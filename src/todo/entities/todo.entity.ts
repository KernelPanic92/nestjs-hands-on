import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'todos' })
export class Todo {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: number;

  @Column({ name: 'title' })
  public title: string;

  @Column({ name: 'completed' })
  public completed: boolean;

  public constructor(title: string) {
    this.title = title;
    this.completed = false;
  }
}
