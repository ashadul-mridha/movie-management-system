import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateReportTable1737798769848 implements MigrationInterface {
  name = 'CreateReportTable1737798769848';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`reports\` ( \`id\` int NOT NULL AUTO_INCREMENT, \`reportedBy\` int NOT NULL, \`movieId\` int NOT NULL, \`reason\` text NOT NULL, \`status\` varchar(255) NOT NULL DEFAULT 'PENDING',\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`reports\``);
  }
}
