import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  Unique,
  BeforeInsert,
  BeforeUpdate,
  OneToMany
} from 'typeorm';
import { IUser } from '@interfaces/user.interface';
import { IsEmail, MinLength } from 'class-validator';
import { normalizeEmailAddress } from '@utils/normalizeEmailAddress';
import { Task } from './task.entity';

@Entity()
@Unique(['email'])
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @IsEmail()
  email!: string;

  @Column()
  @MinLength(8)
  password!: string;

  @OneToMany(() => Task, (task) => task.user)
  tasks!: Task[];

  @Column()
  @CreateDateColumn()
  createdAt!: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt!: Date;

  @BeforeUpdate()
  @BeforeInsert()
  normalizeEmail() {
    this.email = normalizeEmailAddress(this.email);
  }
}
