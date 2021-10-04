const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/proxy/auth",
    createProxyMiddleware({
      target: "http://3.37.18.236:5000/auth",
      changeOrigin: true,
    })
  );
};
