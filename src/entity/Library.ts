import {Entity, PrimaryGeneratedColumn, Column,BaseEntity, OneToMany} from "typeorm";
import { Invoice } from "./Invoice";

@Entity("library")
export class Library extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    Name: string;

    @Column()
    phone: string;
    
    @Column()
    otp: string;
   
    @Column()
    Lang: string;

    @Column()
    lat: string;

    @Column()
    password: string;
    
    @Column()
    active: string;

    @Column()
    complete: string;

    @OneToMany((type) => Invoice, (invoice) => invoice.user)
    invoices: Invoice[];
}
