import { getMetadataArgsStorage } from 'typeorm';
import { ColumnMetadataArgs } from 'typeorm/metadata-args/ColumnMetadataArgs';
import { Todo } from './todo.entity';

describe('Todo ORM Mapping', () => {
  let columns: ColumnMetadataArgs[];

  beforeEach(async () => {
    columns = getMetadataArgsStorage().columns.filter(
      (metadata) => metadata.target === Todo,
    );
  });

  it("Todo should be mapped with @Entity({ name: 'todos' })", () => {
    const entityMetadata = getMetadataArgsStorage().tables.find(
      (metadata) => metadata.target === Todo,
    );

    expect(entityMetadata).toBeDefined();
    expect(entityMetadata.name).toBe('todos');
  });

  it("id should be mapped with @PrimaryGeneratedColumn({ name: 'id' })", () => {
    const idColumn = columns.find((column) => column.propertyName === 'id');

    expect(idColumn).toBeDefined();
    expect(idColumn.options.primary).toBeTruthy();
    expect(idColumn.options.array).toBeFalsy();
    expect(idColumn.options.type).toBe(Number);
    expect(idColumn.options.name).toBe('id');
  });

  it("title should be mapped with @Column({ name: 'title' })", () => {
    const titleColumn = columns.find(
      (column) => column.propertyName === 'title',
    );

    expect(titleColumn).toBeDefined();
    expect(titleColumn.options.primary).toBeFalsy();
    expect(titleColumn.options.array).toBeFalsy();
    expect(titleColumn.options.type).toBe(String);
    expect(titleColumn.options.name).toBe('title');
  });

  it("completed should be mapped  with @Column({ name: 'completed' })", () => {
    const completedColumn = columns.find(
      (column) => column.propertyName === 'completed',
    );

    expect(completedColumn).toBeDefined();
    expect(completedColumn.options.primary).toBeFalsy();
    expect(completedColumn.options.array).toBeFalsy();
    expect(completedColumn.options.type).toBe(Boolean);
    expect(completedColumn.options.name || 'completed').toBe('completed');
  });
});
