import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Tag } from './Tag';
import { User } from './User';

@Entity('passwords')
class Password {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user_id: User;

  @ManyToOne(() => Tag)
  @JoinColumn({ name: 'tag_id' })
  tag_id: Tag;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export { Password };
