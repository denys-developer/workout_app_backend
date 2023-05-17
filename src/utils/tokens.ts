export const getAuthTokenFromHeader = (authorization: string) => authorization.split(' ')[1];
