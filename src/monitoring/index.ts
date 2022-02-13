import express from "express";
import client from "prom-client";

class Monitoring {
	register: client.Registry;
	httpRequestTimer: client.Histogram<"method" | "route" | "code">;

	constructor() {
		this.register = new client.Registry();
		client.collectDefaultMetrics({ register : this.register });

		this.httpRequestTimer = new client.Histogram({
			name: 'http_request_duration_seconds',
			help: 'Duration of HTTP requests in seconds',
			labelNames: ['method', 'route', 'code'],
			buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10] // 0.1 to 10 seconds
		});
		this.register.registerMetric(this.httpRequestTimer);
	}
	RegisterRequestCounter = async (req:express.Request, res:express.Response, next:express.NextFunction) => {
		const end = this.httpRequestTimer.startTimer();
		const route = req.path;
		res.setHeader('Content-Type', this.register.contentType);
		next();
		// End timer and add labels
		end({ route, code: res.statusCode, method: req.method });
	}
}

export const monitorService = new Monitoring();
