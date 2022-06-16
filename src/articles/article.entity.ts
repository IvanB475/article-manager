import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({
    name: 'articles'
})
export class ArticleEntity extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({ nullable: false })
    title: string;

    @Column({ nullable: false })
    slug: string;

    @Column({ nullable: true, type: 'date' })
    published_at: Date;
}