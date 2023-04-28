export const errorMiddleware = (err, req, res) => {
  const status = err.status || 400;
  res.status(status).send(err.message)
};
