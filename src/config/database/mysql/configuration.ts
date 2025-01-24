import { registerAs } from '@nestjs/config';

/**
 * Registering mysql related environment variable as configuration
 *
 * @author Ashadul Mridha <https://github.com/ashadul-mridha>
 * @date 2025-01-24
 */
export default registerAs('mysql', () => ({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  database: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_ROOT_USER,
  password: process.env.MYSQL_ROOT_PASSWORD,
}));
