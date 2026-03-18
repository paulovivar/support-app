import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1773842359113 implements MigrationInterface {
  name = 'Init1773842359113';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "adm_usuarios" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "creado" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "actualizado" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "estado" integer NOT NULL, "username" text NOT NULL, "email" text NOT NULL, "contrasenia" text NOT NULL, "celular" text NOT NULL, CONSTRAINT "UQ_517de9341819f2c294362a1f9f3" UNIQUE ("username"), CONSTRAINT "UQ_549ef5f0207db35e041c6844640" UNIQUE ("email"), CONSTRAINT "PK_7b961988df0cc22ab6a4cef4770" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "prt_categories" ("id" SERIAL NOT NULL, "creado" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "actualizado" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" text NOT NULL, CONSTRAINT "UQ_0b4a494dfc0307c0947dcb2a940" UNIQUE ("name"), CONSTRAINT "PK_39a348560ad06f4f20fb7bcd6ff" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "prt_posts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "creado" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "actualizado" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "titulo" text NOT NULL, "contenido" text, "imagen_portada" text, "resumen" text, "borrador" boolean NOT NULL DEFAULT true, "perfil_id" uuid NOT NULL, CONSTRAINT "PK_495a0c4bb3b571bc01be618dbde" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "adm_perfiles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "usuario_dni" text, "usuario_email" text, "telefono" text, "usuario_avatar" text, "primer_nombre" text, "segundo_nombre" text, "primer_apellido" text, "segundo_apellido" text, "fecha_nacimiento" date, "numero_casa" text, "direccion" text, "parroquia" text, "ciudad" text, "provincia" text, "pais" text, "tipo_identificacion" integer, "persona_legal" integer, "estado_civil" integer, "contrayente" text, "parroquia_id" text, "ciudad_id" text NOT NULL, "provincia_id" text, "usuario_id" uuid NOT NULL, CONSTRAINT "UQ_ca78b4875cad6a9e273aaed76cf" UNIQUE ("usuario_dni"), CONSTRAINT "UQ_03a733800e93f43efd7260832b7" UNIQUE ("usuario_email"), CONSTRAINT "REL_9d5dbf3118550f71d292bfb8ab" UNIQUE ("usuario_id"), CONSTRAINT "PK_c6d6c53389d2d29f98ff0d38d48" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "prt_posts_categories" ("post_id" uuid NOT NULL, "category_id" integer NOT NULL, CONSTRAINT "PK_274ba18864e09eb2ae2ae493ca9" PRIMARY KEY ("post_id", "category_id"))`);
    await queryRunner.query(`CREATE INDEX "IDX_9ae71a95d19e8d9d0dd99e7509" ON "prt_posts_categories" ("post_id") `);
    await queryRunner.query(`CREATE INDEX "IDX_1e8dd924082a7f4e370eaebeca" ON "prt_posts_categories" ("category_id") `);
    await queryRunner.query(`ALTER TABLE "prt_posts" ADD CONSTRAINT "FK_3d81f470c601db8773efd2d635d" FOREIGN KEY ("perfil_id") REFERENCES "adm_perfiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "adm_perfiles" ADD CONSTRAINT "FK_9d5dbf3118550f71d292bfb8ab3" FOREIGN KEY ("usuario_id") REFERENCES "adm_usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "prt_posts_categories" ADD CONSTRAINT "FK_9ae71a95d19e8d9d0dd99e75097" FOREIGN KEY ("post_id") REFERENCES "prt_posts"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    await queryRunner.query(`ALTER TABLE "prt_posts_categories" ADD CONSTRAINT "FK_1e8dd924082a7f4e370eaebeca6" FOREIGN KEY ("category_id") REFERENCES "prt_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "prt_posts_categories" DROP CONSTRAINT "FK_1e8dd924082a7f4e370eaebeca6"`);
    await queryRunner.query(`ALTER TABLE "prt_posts_categories" DROP CONSTRAINT "FK_9ae71a95d19e8d9d0dd99e75097"`);
    await queryRunner.query(`ALTER TABLE "adm_perfiles" DROP CONSTRAINT "FK_9d5dbf3118550f71d292bfb8ab3"`);
    await queryRunner.query(`ALTER TABLE "prt_posts" DROP CONSTRAINT "FK_3d81f470c601db8773efd2d635d"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_1e8dd924082a7f4e370eaebeca"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_9ae71a95d19e8d9d0dd99e7509"`);
    await queryRunner.query(`DROP TABLE "prt_posts_categories"`);
    await queryRunner.query(`DROP TABLE "adm_perfiles"`);
    await queryRunner.query(`DROP TABLE "prt_posts"`);
    await queryRunner.query(`DROP TABLE "prt_categories"`);
    await queryRunner.query(`DROP TABLE "adm_usuarios"`);
  }
}
