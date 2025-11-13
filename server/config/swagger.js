const yaml = require("yamljs");
const swaggerDocument = yaml.load("./docs/swagger.yaml");
module.exports = swaggerDocument;
