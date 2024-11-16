import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Company{
        @PrimaryGeneratedColumn()
        id: number;
      
        @Column()
        name: string;
    
        @Column({ nullable: true })
        city: string;

        @Column({ nullable: true })
        quater: string;

        @Column({ nullable: true })
        phone: string;

        @Column({ nullable: true })
        longitude: string;

        @Column({ nullable: true })
        latitude: string;
      
        @Column({ nullable: true })
        file: string;
      
        @Column({ nullable: true })
        email: string;
      
        @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
        createdAt: Date;
      
        @Column({
          type: 'timestamp',
          default: () => 'CURRENT_TIMESTAMP',
          onUpdate: 'CURRENT_TIMESTAMP',
        })
        updatedAt: Date;
      
        // @OneToMany(() => Employee, (employee) => employee.company)
        // employees: Employee[];
}