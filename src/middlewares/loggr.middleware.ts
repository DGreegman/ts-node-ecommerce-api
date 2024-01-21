import { NextFunction, Request, Response } from "express";

/**
 * @desc Server Logger
 */
class Loggr {
  constructor() { this.log }


  /**
   * @desc Logs events on the server
   */
  log(req: Request, res: Response, next: NextFunction) {
    let date = new Date;
    const timestamp = date.toString();

    console.warn(`[${req.method}] - ${req.protocol}://${req.headers.host}${req.originalUrl} [${req.ip}][${timestamp}]`);
    next();
  };
}

export default Loggr;