export class ResponseError extends Error {
  constructor(
    public status: string,
    public code: number,
    message: string,
  ) {
    super(message);
  }
}

export class ApiResponse {
  constructor(
    public status: string,
    public code: number,
    public message: string,
    public data?: any,
  ) {}

  toJson() {
    return {
      status: this.status,
      code: this.code,
      message: this.message,
      data: this.data,
    };
  }
}
