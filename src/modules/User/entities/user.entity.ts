import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { UserType } from '../../../common/enums/user.enums';
import { Movie } from '../../Movie/entities/movie.entity';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  userName: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ default: UserType.USER })
  role: UserType;

  @OneToMany(() => Movie, (movie) => movie.user)
  movies: Movie[];

  //   @OneToMany(() => Rating, (rating) => rating.user)
  //   ratings: Rating[];
}
