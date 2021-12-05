const fs = require('fs');
const path = require('path');

const dbFilePath = path.join(__dirname, 'db');

exports.readFile = function (fPath = dbFilePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(fPath, (err, data) => {
      if (err) {
        console.log(err);
        reject({success: false, error: err.message});
      } else {
        resolve({success: true, data: data.toString()});
      }
    });
  });
}

exports.writeFile = function (content, fPath = dbFilePath) {
  return new Promise((resolve, reject) => {
    fs.writeFile(fPath, content, (err) => {
      if (err) {
        console.log(err);
        reject({success: false, error: err.message});
      } else {
        resolve({success: true});
      }
    });
  });
}