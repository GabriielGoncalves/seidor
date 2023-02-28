import { MigrationInterface, QueryRunner } from "typeorm";

export class default1677620979537 implements MigrationInterface {
    name = 'default1677620979537'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Cars" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "licensePlate" text, "color" text, "brand" text NOT NULL, CONSTRAINT "PK_37ee9dbe8c8c8ff70b35afaf2a8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Rent" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "startRent" TIMESTAMP NOT NULL DEFAULT now(), "endRent" character varying NOT NULL DEFAULT '', "description" text NOT NULL, "active" boolean NOT NULL DEFAULT true, "driverId" uuid, "carId" uuid, CONSTRAINT "REL_bcda45d432889f76d442fa32a7" UNIQUE ("driverId"), CONSTRAINT "REL_3f5ecadfdf94a223445f5daaf4" UNIQUE ("carId"), CONSTRAINT "PK_b6907aa816d1fb961c4f4e9d951" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Drivers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, CONSTRAINT "PK_4f4c4a5af0792f02e2028a85693" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Rent" ADD CONSTRAINT "FK_bcda45d432889f76d442fa32a78" FOREIGN KEY ("driverId") REFERENCES "Drivers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Rent" ADD CONSTRAINT "FK_3f5ecadfdf94a223445f5daaf4a" FOREIGN KEY ("carId") REFERENCES "Cars"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Rent" DROP CONSTRAINT "FK_3f5ecadfdf94a223445f5daaf4a"`);
        await queryRunner.query(`ALTER TABLE "Rent" DROP CONSTRAINT "FK_bcda45d432889f76d442fa32a78"`);
        await queryRunner.query(`DROP TABLE "Drivers"`);
        await queryRunner.query(`DROP TABLE "Rent"`);
        await queryRunner.query(`DROP TABLE "Cars"`);
    }

}
