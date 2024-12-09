
const logger = (req, res, next) => {
  console.log('Nova requisição realizada em:', Date.now, req.url);
  next();
}

module.exports = logger;