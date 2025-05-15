import { Employee } from "src/employees/entities/employee.entity";
import { Manager } from "src/managers/entities/manager.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    userId: string;
    @Column("text",{
        unique: true
    })
    userEmail: string;
    @Column("text")
    userPassword: string;
    @Column("simple-array",{ default: "Employee"})
    userRoles: string[];
    @OneToOne(() => Manager)
    @JoinColumn()
    manager: Manager;

    @OneToOne(() => Employee, {
        eager: true
    })
    @JoinColumn()
    employee: Employee;

}