import { MigrationInterface, QueryRunner } from "typeorm";

export class default1677607748125 implements MigrationInterface {
    name = 'default1677607748125'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Cars" DROP COLUMN "licensePlate"`);
        await queryRunner.query(`ALTER TABLE "Cars" ADD "licensePlate" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Cars" DROP COLUMN "color"`);
        await queryRunner.query(`ALTER TABLE "Cars" ADD "color" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Cars" DROP COLUMN "brand"`);
        await queryRunner.query(`ALTER TABLE "Cars" ADD "brand" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Drivers" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "Drivers" ADD "name" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Drivers" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "Drivers" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Cars" DROP COLUMN "brand"`);
        await queryRunner.query(`ALTER TABLE "Cars" ADD "brand" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Cars" DROP COLUMN "color"`);
        await queryRunner.query(`ALTER TABLE "Cars" ADD "color" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Cars" DROP COLUMN "licensePlate"`);
        await queryRunner.query(`ALTER TABLE "Cars" ADD "licensePlate" character varying NOT NULL`);
    }

}
