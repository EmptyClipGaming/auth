module.exports = {
  entry: "./app/entry.jsx",
  output: {
    path: __dirname + "/public/javascripts",
    filename: "bundle.js"
  },
  module: {
    loaders: [
      { test: /\.jsx$/, loader: "jsx-loader"}
    ]
  }
};
