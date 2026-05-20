const apiErrorHandler = (err, req, res, next) => {
  console.error('API Error:', err);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Внутрішня помилка сервера';

  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message: message
  });
}

module.exports = apiErrorHandler;
