import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class UserMigration1668306703972 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isNullable: false,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'username',
            type: 'varchar',
            isUnique: true,
            length: '100',
          },
          {
            name: 'password',
            type: 'varchar',
            length: '100',
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
            length: '200',
          },
          {
            name: 'nombre',
            type: 'varchar',
            length: '100',
          },
          {
            name: 'apellido',
            type: 'varchar',
            length: '100',
          },
          {
            name: 'createdAt',
            type: 'datetime',
            default: 'current_timestamo',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS "users"');
  }
}
