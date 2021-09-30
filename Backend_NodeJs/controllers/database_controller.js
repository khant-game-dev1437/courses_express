const db = require('../database_configuration/database_helper');

class Database_Controller {

    constructor() {

    }

    registerationCredentials(email, password) {
        console.log("EMAIL :", email);
        console.log("password: ", password);
        return new Promise(async (resolve, reject) => {
          var sql =
            "SELECT COUNT (user_email AND user_password) AS count FROM user_table WHERE user_email=? AND user_password=?";
          try {
            var result = await db.query(sql, [email, password]);
            console.log('result count ', result[0].count);
            if (result[0].count <= 0) {
              var insertSql = "INSERT INTO user_table SET user_email=?,user_password=?";
              var insertResult = await db.query(insertSql, [email, password]);
              if(insertResult.affectedRows > 0) {
                  resolve(insertResult.affectedRows);
                  console.log("Success");
                return 
              }
              console.log("Insert result :", insertResult);
            } else {
              console.log("Same Email");
            }
          } catch (err) {
            reject(err);
            console.log("err", err);
          }
        });
      }
      
    sendCredentialstoClient(req, res) {
        console.log("SEND CREDENTIALS");
        return new Promise(async(resolve, reject) => {
          var sql = "SELECT COUNT (user_id) AS count FROM user_table";
          var result = await db.query(sql);
          console.log("result count ", result[0].count);
          if(result[0].count) {
            var number = result[0].count;
            for(var i = 1; i <= number; i++) {
              var sql = "SELECT * FROM user_table WHERE user_id=?";
              var result = await db.query(sql,[i]);
              var jsonParse = result[0];
              credentials.push(jsonParse);
              console.log('credentials ',credentials);
              if(i == number) {
                resolve(credentials);
                res.send(credentials);
                console.log(credentials);
                credentials= [];
              }
            }
          }
        })
      }
}
module.exports = Database_Controller;

 