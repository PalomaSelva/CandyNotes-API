module.exports = {
  bail: true, // caso um teste falhe, ele para de executar todos os testes
  coverageProvider: "v8",

  testMatch: ["<rootDir>/src/**/*.spec.js"],
};
