module.exports = {
  presets: [
    ['@babel/preset-env', { targets: 'last 2 versions' }],
    ['@babel/preset-typescript', { allowDeclareFields: true }], // Habilitar allowDeclareFields
  ],
  plugins: [
    ['@babel/plugin-transform-typescript', { allowDeclareFields: true }],
  ],
};
