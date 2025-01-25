import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRatingTable1737789251685 implements MigrationInterface {
  name = 'CreateRatingTable1737789251685';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`rating\` (\`id\` int NOT NULL AUTO_INCREMENT, \`ratingValue\` int NOT NULL, \`userId\` int NOT NULL, \`movieId\` int NOT NULL,\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`rating\``);
  }
}
