// src/errors.ts

export type InkPilotsErrorCode =
	| "unauthorized"
	| "forbidden"
	| "not_found"
	| "rate_limited"
	| "access_quota_exceeded"
	| "bad_request"
	| "server_error"
	| "unknown";

export class InkPilotsApiError extends Error {
	readonly name: string = "InkPilotsApiError";
	readonly status: number;
	readonly code: InkPilotsErrorCode;
	readonly requestId?: string;
	readonly details?: unknown;

	constructor(args: {
		message: string;
		status: number;
		code: InkPilotsErrorCode;
		requestId?: string;
		details?: unknown;
	}) {
		super(args.message);
		this.status = args.status;
		this.code = args.code;
		this.requestId = args.requestId;
		this.details = args.details;
	}
}

/**
 * Specific error: HTTP 402 "Access quota exceeded"
 */
export class InkPilotsQuotaExceededError extends InkPilotsApiError {
	readonly name = "InkPilotsQuotaExceededError";

	constructor(args: {
		message?: string;
		requestId?: string;
		details?: unknown;
	} = {}) {
		super({
			message: args.message ?? "Access quota exceeded (402).",
			status: 402,
			code: "access_quota_exceeded",
			requestId: args.requestId,
			details: args.details,
		});
	}
}
