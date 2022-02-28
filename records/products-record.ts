import {pool} from '../utils/database';
import {ValidationError} from "../utils/error";
import {FieldPacket} from "mysql2";
import {v4 as uuid} from 'uuid'

type ProductRecordResult = [ProductRecord[], FieldPacket[]]

export class ProductRecord {
    public id?: string;
    public name: string;
    public value: number;
    public city: string;
    public image: string;
    public description: string;


    constructor(obj: ProductRecord) {
        const {id, name, value, city, image, description} = obj;

        if(name.length > 80){
            throw new ValidationError('Item name should be less than 80 characters')
        }

        this.id = id;
        this.name = name;
        this.value = value;
        this.city = city;
        this.image = image;
        this.description = description;
    }

    async insert(): Promise<string>{
        if(!this.id){
            this.id = uuid();
        }

        await pool.execute(
            "INSERT INTO `products`(`id`,`name`,`value`,`city`, `image`,`description`) VALUES (:id, :name, :value, :city, :image, :description)" , {
                id: this.id,
                name: this.name,
                value: this.value,
                city: this.city,
                image: this.image,
                description: this.description
            })

        return this.id;
    }

    static async getAll(): Promise<ProductRecord[]>{
        const [results] = await pool.execute("SELECT * FROM `products`") as ProductRecordResult
        return results.map(obj => {
            // e.log(obj)
            return new ProductRecord(obj)
        })
    }
}