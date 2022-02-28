import * as express from 'express';
import 'express-async-errors';
import * as methodOverride from 'method-override';
import {urlencoded, static as eStatic} from 'express';
import {engine} from 'express-handlebars';
import * as fileUpload from 'express-fileupload'
import * as path from 'path'


import './utils/database'
import {homeRouter} from "./routers/home";
import {handleError} from "./utils/error";
import {addProductRouter} from "./routers/addProducts";


const app = express();


app.use(methodOverride('_method'));
app.use(urlencoded({
    extended: true,
}))
app.use(eStatic('public'))  //For static files
app.use(eStatic('upload'))  //For static files
app.engine('.hbs' , engine({
    extname: '.hbs',
    // helpers
}))
app.set('view engine','.hbs');
app.use(fileUpload());

app.use('/' , homeRouter)
app.use('/add-product' , addProductRouter)


app.use(handleError)



//Over 9000
app.listen(9001, 'localhost' , () => {
    console.log("I'm listening on http://localhost:9001")
})