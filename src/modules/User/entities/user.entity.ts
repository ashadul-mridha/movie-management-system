import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  userName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'user' })
  role: 'user' | 'admin';

  //   @OneToMany(() => Movie, (movie) => movie.createdBy)
  //   movies: Movie[];

  //   @OneToMany(() => Rating, (rating) => rating.user)
  //   ratings: Rating[];
}
