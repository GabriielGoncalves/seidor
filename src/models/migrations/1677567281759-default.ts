import { MigrationInterface, QueryRunner } from "typeorm";

export class default1677567281759 implements MigrationInterface {
    name = 'default1677567281759'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Rent" DROP COLUMN "active"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Rent" ADD "active" boolean NOT NULL`);
    }

}
