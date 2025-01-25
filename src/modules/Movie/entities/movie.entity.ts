import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Rating } from '../../Rating/entities/rating.entity';

@Entity('movies')
export class Movie extends BaseEntity {
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

  // @ManyToOne(() => User, (user) => user.movies, { onDelete: 'CASCADE' })
  // createdBy: User;

  @OneToMany(() => Rating, (rating) => rating.movie)
  ratings: Rating[];
}
