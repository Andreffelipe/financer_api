import { Entity, Column, PrimaryColumn, Unique } from 'typeorm';

@Entity()
@Unique(['email'])
export class UserModel {
  @PrimaryColumn()
  id!: string;
  @Column()
  firstName!: string;
  @Column({ unique: true })
  email!: string;
  @Column()
  password!: string;
}

