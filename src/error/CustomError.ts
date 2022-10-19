/** Blog */
// export default class CustomError extends Error {
//   statusCode: number;

//   constructor(statusCode: number, message: string) {
//     super(message);

//     Object.setPrototypeOf(this, new.target.prototype);
//     this.name = Error.name;
//     this.statusCode = statusCode;
//     Error.captureStackTrace(this);
//   }
// }

/** live lecture */
export default class CustomError extends Error {
  statusCode: number;

  message: string;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
  }
}
