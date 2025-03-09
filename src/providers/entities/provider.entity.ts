
import { Column, Entity, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { Product } from 'src/products/entities/product.entity'
import { User } from 'src/auth/entities/user.entity'

@Entity()

export class Provider {
    @PrimaryGeneratedColumn("uuid")
    providerId: string;
    @Column({type:'text'})
    providerName: string;
    @Column('text',{
        unique: true
    })
    providerEmail: string;
    @Column({
        type: "text",
        nullable: true
    })
    providerPhoneNumber: string;

    @OneToMany(()=> Product, (photo) => photo.provider)
    products: Product[] 

    @OneToOne(()=> User)
    @JoinColumn({
        name: "userId"
    })
    user: User;
}