import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({
    name: 'articles'
})
export class ArticleEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    title: string;

    @Column({ nullable: false })
    slug: string;

    @Column({ nullable: true })
    published_at: Date;
}