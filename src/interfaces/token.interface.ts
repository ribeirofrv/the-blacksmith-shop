export interface IToken {
  token: string,
}

export interface IPayload {
  id: number,
  username: string,
}

export interface IDecodedUser {
  id: number,
  username: string,
  iat: number,
}
