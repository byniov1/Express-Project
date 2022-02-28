import {NextFunction, Request, Response} from "express";

export class ValidationError extends Error{}

export const handleError = (err: Error, req: Request, res:Response, next: NextFunction): void => {
    console.log(err);

    res
        .status(err instanceof ValidationError ? 400 : 500)
        .render('error' , {
            message: err.message
        })

    //@TODO change render of error only to Validation error,
    // .render('error' , {
    //   message: err instanceof ValidationError ? err.message : 'We're working on this. Thank you for your patience'
    // })




}