import express from "express";

class Logging {
	RequestResponseLogger = (data: any, req:express.Request, res:express.Response, _next:express.NextFunction) => {
		if (data.success) {
			const log = this.CreateLog(JSON.stringify(data), null, req, res);
			console.log(log);
			//TODO: do something with log. write it in a db or maybe send an elastic search instance

			const statusCode = data.statusCode;
			delete data.statusCode;
			res.status(statusCode).json(data);
		} else {
			if (data instanceof Error) {
				const defaultErrorResponse = {success:false, message:"Internal Server Error"};
				const log = this.CreateLog(JSON.stringify(defaultErrorResponse), data, req, res);
				console.log(log);
				//TODO: do something with log. write it in a db or maybe send an elastic search instance

				res.status(500).json(defaultErrorResponse);
			} else {
				const log = this.CreateLog(JSON.stringify(data), `${data.err} => ${data.err.stack}`, req, res);
				console.log(log);
				//TODO: do something with log. write it in a db or maybe send an elastic search instance

				const oldSend = res.json;
				res.json = function(data) {
					delete data.err;
					res.json = oldSend;
					return res.json(data);
				};
				res.status(data.statusCode).json(data);
			}
		}
	};

	private CreateLog = (content: any, error: any, req:express.Request, res:express.Response) => {
		return {
			Route: req.originalUrl,
			Method: req.method,
			RequestHeaders: JSON.stringify(req.headers),
			RequestBody: JSON.stringify(req.body),
			ResponseBody: content,
			ResponseHeaders: JSON.stringify(res.getHeaders()),
			ResponseStatus: res.statusCode,
			Exception: error

			// The fields below are unnecessary for now but keeping them as comment lines is good for future implementations
			//UserId: req.user ? req.user.Id : undefined,
			//SessionId: req.user ? req.user.Session.Id : undefined,
		};
	}
}

export const loggingMiddleware = new Logging();







