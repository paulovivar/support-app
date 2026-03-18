import { MigrationInterface, QueryRunner } from 'typeorm';

export class NewFields1773850729902 implements MigrationInterface {
  name = 'NewFields1773850729902';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "prt_categories" DROP CONSTRAINT "UQ_0b4a494dfc0307c0947dcb2a940"`);
    await queryRunner.query(`ALTER TABLE "prt_categories" DROP COLUMN "name"`);
    await queryRunner.query(`ALTER TABLE "prt_categories" ADD "nombre" text`);
    await queryRunner.query(`ALTER TABLE "prt_categories" ADD CONSTRAINT "UQ_a0fb0da8554b1e42a7fc34c0e3f" UNIQUE ("nombre")`);
    await queryRunner.query(`ALTER TABLE "prt_categories" ADD "descripcion" text`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "prt_categories" DROP COLUMN "descripcion"`);
    await queryRunner.query(`ALTER TABLE "prt_categories" DROP CONSTRAINT "UQ_a0fb0da8554b1e42a7fc34c0e3f"`);
    await queryRunner.query(`ALTER TABLE "prt_categories" DROP COLUMN "nombre"`);
    await queryRunner.query(`ALTER TABLE "prt_categories" ADD "name" text NOT NULL`);
    await queryRunner.query(`ALTER TABLE "prt_categories" ADD CONSTRAINT "UQ_0b4a494dfc0307c0947dcb2a940" UNIQUE ("name")`);
  }
}
