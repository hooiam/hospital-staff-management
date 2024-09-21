const errorHandler = (err, req, res, next) => {
  // Set a default status code for different types of errors
  const statusCode = err.statusCode || 500
  const message = err.message || 'Internal Server Error'

  // Foreign key exception handling
  if (err.name === 'SequelizeForeignKeyConstraintError') {
    return res.status(400).json({
      message: "Invalid roleId or this operation can't be performed"
    });
  }

  // Contact number unique key error handling
  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(409).json({
      message: err.errors[0].message
    });
  }

  return res.status(statusCode).json({ message });
};

module.exports = errorHandler;