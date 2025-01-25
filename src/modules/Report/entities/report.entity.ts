import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { ReportType } from '../../../common/enums/report.enum';

@Entity('reports')
export class Report extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: false })
  reportedBy: number; // ID of the user who reported the movie

  @Column({ type: 'int', nullable: false })
  movieId: number;

  @Column({ type: 'text', nullable: false })
  reason: string;

  @Column({
    type: 'varchar',
    length: 255,
    default: ReportType.PENDING,
  })
  status: string;

  // @ManyToOne(() => User, (user) => user.reports, { onDelete: 'CASCADE' })
  // user: User;

  // @ManyToOne(() => Movie, (movie) => movie.reports, { onDelete: 'CASCADE' })
  // movie: Movie;
}
