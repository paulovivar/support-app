import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangesNull1773852162201 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "prt_categories" ALTER COLUMN "nombre" SET NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "prt_categories" ALTER COLUMN "nombre" DROP NOT NULL`);
  }
}
