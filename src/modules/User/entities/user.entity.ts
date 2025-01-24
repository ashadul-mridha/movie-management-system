import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { UserType } from '../../../common/enums/user.enums';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ unique: true })
  userName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: UserType.USER })
  role: UserType;

  //   @OneToMany(() => Movie, (movie) => movie.createdBy)
  //   movies: Movie[];

  //   @OneToMany(() => Rating, (rating) => rating.user)
  //   ratings: Rating[];
}
