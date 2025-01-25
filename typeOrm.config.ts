import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { Movie } from './src/modules/Movie/entities/movie.entity';
import { Rating } from './src/modules/Rating/entities/rating.entity';
import { User } from './src/modules/User/entities/user.entity';

config();

export default new DataSource({
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: parseInt(process.env.MYSQL_PORT),
  username: process.env.MYSQL_ROOT_USER,
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  entities: [User, Movie, Rating],
  migrationsTableName: 'typeorm_migrations',
  migrations: ['src/database/migrations/*{.ts,.js}'],
});
