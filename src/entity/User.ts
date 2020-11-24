import {Entity, PrimaryGeneratedColumn, Column,BaseEntity, OneToMany} from "typeorm";
import { Invoice } from "./Invoice";

@Entity("user")
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

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
    active: boolean;

    @Column()
    complete: boolean;
    
    @OneToMany((type) => Invoice, (invoice) => invoice.user)
    invoices: Invoice[];

}
