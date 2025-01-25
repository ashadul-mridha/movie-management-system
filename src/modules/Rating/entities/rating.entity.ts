import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Movie } from '../../Movie/entities/movie.entity';

@Entity('rating')
export class Rating extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: false })
  ratingValue: number;

  @Column({ type: 'int', nullable: false })
  userId: number;

  @Column({ type: 'int', nullable: false })
  movieId: number;

  // @ManyToOne(() => User, (user) => user.ratings, { onDelete: 'CASCADE' })
  // user: User;

  @ManyToOne(() => Movie, (movie) => movie.ratings)
  movie: Movie;
}
