import { Router } from 'express';
import {ProductRecord} from "../records/products-record";


export const homeRouter = Router()

homeRouter
    .get('/' , async (req,res) => {

        const products = await ProductRecord.getAll()
        // console.log(products)
        res.render('home/home' , {
            products
        });

    })
