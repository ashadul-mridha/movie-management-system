import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateMovieTable1737784603043 implements MigrationInterface {
  name = 'CreateMovieTable1737784603043';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`movies\` (\`title\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`releasedAt\` date NOT NULL, \`duration\` int NOT NULL, \`genre\` varchar(255) NOT NULL, \`language\` varchar(255) NOT NULL, \`avgRating\` float NOT NULL DEFAULT '0', \`totalRatings\` int NOT NULL DEFAULT '0', \`createdBy\` int NOT NULL,\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`movies\``);
  }
}
