import * as express from 'express';

const app = express();

app.get('/' , (req, res) => {
    res.send('Hello World')
})

//Over 9000
app.listen(9001, 'localhost' , () => {
    console.log("I'm listening on http://localhost:9001")
})