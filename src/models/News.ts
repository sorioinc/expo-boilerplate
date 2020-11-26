import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm/browser';

@Entity('news')
class News {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  url: string;

  @Column('text')
  title: string;

  constructor(id: number, url: string, title: string) {
    this.id = id;
    this.url = url;
    this.title = title;
  }
}

export default News;
