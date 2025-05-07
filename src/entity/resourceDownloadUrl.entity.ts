import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('resource_download_url')
export class ResourceDownloadUrl {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'resource_id', type: 'int', nullable: false })
  resourceId: number;

  @Column({ name: 'key', type: 'varchar', length: 255, nullable: false })
  key: string;
}