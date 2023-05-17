import { errorMiddleware } from '@/middlewares';

const mockReq = {};
const mockRes = {
  status: jest.fn().mockReturnThis(),
  send: jest.fn(),
};

describe('errorMiddleware', () => {
  it('should set the status and send the error message', () => {
    const mockError = {
      status: 404,
      message: 'Not found',
    };
    errorMiddleware(mockError, mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.send).toHaveBeenCalledWith('Not found');
  });

  it('should set the status to 400 if no status is provided in the error object', () => {
    const mockError = {
      message: 'Bad request',
    };

    errorMiddleware(mockError, mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.send).toHaveBeenCalledWith('Bad request');
  });
});
