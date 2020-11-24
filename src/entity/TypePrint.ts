import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Invoice } from './Invoice';

@Entity("typePrint")
export class TypePrint extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string;

    @Column()
    status: number;
//-------------------------Realation
    @OneToMany((type) => Invoice, (item) => item.TypePrint)
    Invoice: TypePrint;
}