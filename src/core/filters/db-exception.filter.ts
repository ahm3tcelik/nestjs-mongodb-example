import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { MongoError } from 'mongodb';

@Catch(MongoError)
export class DbExceptionFilter implements ExceptionFilter<MongoError> {

    catch(exception: MongoError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest();
        let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = exception.message;

        switch (exception.code) {
            case 11000:
                statusCode = HttpStatus.BAD_REQUEST;
                message = 'Email is already taken.'
                break;
        }

        const res = {
            timestamp: new Date().toISOString(),
            path: request.path,
            method: request.method,
            message: message,
            error: exception.name
        };
        ctx.getResponse().status(statusCode).json(res);
    }

}