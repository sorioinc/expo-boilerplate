import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm/browser';
import { Language } from '../Settings';

@Entity('settings')
class Settings {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  language: Language;

  @Column('integer')
  darkMode: boolean;

  constructor(id: number, language: Language, darkMode: boolean) {
    this.id = id;
    this.language = language;
    this.darkMode = darkMode;
  }
}

export default Settings;
