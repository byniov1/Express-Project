import {Router} from 'express';
import * as path from "path";
import {ValidationError} from "../utils/error";
import {ProductRecord} from "../records/products-record";
import {UploadedFile} from "express-fileupload";

export const addProductRouter = Router();

addProductRouter
    .get('/', (req, res) => {
        res.render("add-product/add-product")
    })
    .post('/', async (req, res) => {
        //@TODO break import to another function, and in latter stages figure out how to store whole image in database
        let image;
        let uploadPath;

        if (!req.files || Object.keys(req.files).length === 0) {
            throw new ValidationError(`No file were uploaded`)
        }

        //name of the input is image
        image = req.files.image;
        uploadPath = path.join(__dirname , '../' +'/upload/' + image.name)

        //use mv() to place file on the server
        image.mv(uploadPath, async function (err) {
            if (err) {
                res.status(500)
                throw new ValidationError(err.message)
            }

            const newProduct = {
                ...req.body,
                image : image.name
            }
            await new ProductRecord(newProduct).insert()
        })

        res.render("add-product/product-added")
    })