import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('game_download_url')
export class GameDownloadUrl {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'key', type: 'varchar', length: 255, nullable: false })
  key: string;

  @Column({ name: 'version', type: 'varchar', length: 50, nullable: false, default: 'v1.0' })
  version: string;

  @Column({ name: 'game_id', type: 'int', nullable: false })
  gameId: number;

  constructor(gameId: number, url: string, version: string) {
    this.gameId = gameId;
    this.key = url;
    this.version = version;
  }
}
