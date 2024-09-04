declare namespace Express {
  export interface Request {
    user: import('./interfaces/payload.interface').Payload;
  }
}
