import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Rating } from '../../Rating/entities/rating.entity';
import { Report } from '../../Report/entities/report.entity';
import { User } from '../../User/entities/user.entity';

@Entity('movies')
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  title: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'date', nullable: false })
  releasedAt: Date;

  @Column({ type: 'int', nullable: false })
  duration: number; // In minutes

  @Column({ type: 'varchar', length: 255, nullable: false })
  genre: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  language: string;

  @Column({ type: 'float', default: 0 })
  avgRating: number;

  @Column({ type: 'int', default: 0 })
  totalRatings: number;

  @Column({ type: 'int', nullable: false })
  createdBy: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;

  @ManyToOne(() => User, (user) => user.movies)
  @JoinColumn({ name: 'createdBy' })
  user: User;

  @OneToMany(() => Rating, (rating) => rating.movie)
  ratings: Rating[];

  @OneToMany(() => Report, (report) => report.movie)
  reports: Rating[];
}
