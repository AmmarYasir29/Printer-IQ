import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    CreateDateColumn,
    ManyToOne,
    BaseEntity,
  } from "typeorm";
import { User } from "./User";
import { Library } from './Library';
import { TypePrint } from "./TypePrint";

  @Entity("invoices")
  export class Invoice extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: "float",nullable: true })
    total: number;
  
    @Column({ nullable: true })
    fileurl: string;
  
    @Column({ nullable: true })
    status: string;
  
    @Column({ nullable: true })
    countPainter: string;
  
    @Column({ nullable: true })
    note: string;
  
    @Column()
    @CreateDateColumn()
    deadline: Date;
  
    @Column()
    @CreateDateColumn()
    updatedAt: Date;
  
    // -------------------------------- Relations ------------------------
  
    @ManyToOne((type) => User, (user) => user.invoices)
    user: User;
  
    @OneToMany((type) => Library, (item) => item.invoices)
    libraryName: Library;
    
    @OneToMany((type) => TypePrint, (item) => item.Invoice)
    TypePrint: TypePrint;
  }