import express from "express";

class TestController {
	ThrowHandledException = (_req:express.Request, res:express.Response, next:express.NextFunction) => {
		try {
			const exMsg = "You just requested an handled exception";
			if ((Math.floor(Math.random()*2) + 1) === 1) {
				throw new Error(exMsg);
			}
			else {
				next({success:true, statusCode:200, message:"SUCCESSFUL"});
			}
		} catch (err) {
			next({	success:false, statusCode:400, message:"ERR_USER_INVALID_INPUT", err:err});
		}
	};

	ThrowUnHandledException = (_req:express.Request, _res:express.Response, next:express.NextFunction) => {
		const exMsg = "You just requested an UNHANDLED exception";
		next(new Error(exMsg));
	};
}

export const testController = new TestController();
