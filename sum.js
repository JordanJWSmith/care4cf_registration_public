var mysql = require('mysql');

var conn = mysql.createPool({
  // insert database host server here
    host: 'example.database.azure.com',  
    // insert database username here
    user: 'example@care4cf-db',  
    // insert database password here
    password: 'password',  
    database: 'care4cf_private',  
    port: 3306,
    ssl: true,
    multipleStatements: true
}); 

var createDB = `
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema care4cf_private
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema care4cf_private
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS \`care4cf_private\` DEFAULT CHARACTER SET latin1 ;
USE \`care4cf\` ;



-- -----------------------------------------------------
-- Table \`care4cf_private\`.\`accesstokens\`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS \`care4cf_private\`.\`accesstokens\` (
  \`tokenHash\` VARCHAR(32) NOT NULL,
  \`userID\` INT(11) NOT NULL,
  \`accessToken\` MEDIUMTEXT NOT NULL,
  PRIMARY KEY (\`tokenHash\`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table \`care4cf_private\`.\`users\`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS \`care4cf_private\`.\`users\` (
  \`userID\` INT(11) NOT NULL AUTO_INCREMENT,
  \`email\` VARCHAR(100) NOT NULL,
  \`fName\` VARCHAR(45) NULL DEFAULT NULL,
  \`lName\` VARCHAR(45) NULL DEFAULT NULL,
  \`doB\` DATE NULL DEFAULT NULL,
  \`nhsNumber\` VARCHAR(10) NULL DEFAULT NULL,
  \`gender\` SET('M', 'F', 'O', 'P') NULL DEFAULT NULL,
  \`address1\` VARCHAR(100) NULL DEFAULT NULL,
  \`address2\` VARCHAR(100) NULL DEFAULT NULL,
  \`townCity\` VARCHAR(100) NULL DEFAULT NULL,
  \`postCode\` VARCHAR(10) NULL DEFAULT NULL,
  \`msalToken\` MEDIUMTEXT NULL DEFAULT NULL,
  PRIMARY KEY (\`userID\`),
  UNIQUE INDEX \`email_UNIQUE\` (\`email\` ASC) VISIBLE,
  UNIQUE INDEX \`nhsNumber_UNIQUE\` (\`nhsNumber\` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 204
DEFAULT CHARACTER SET = latin1;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

`

// uncomment the below to create 
// the database schema

// conn.query(createDB, function (err, result) {
//     if (err) throw err;
//     // console.log('result: ', result);
//   });


module.exports = conn;


/* sum.js */

module.exports = function() {

    // Convert arguments object to an array
    var args = Array.prototype.slice.call(arguments);
    
    // Throw error if arguments contain non-finite number values
    if (!args.every(Number.isFinite)) {
      throw new TypeError('sum() expects only numbers.')
    }
    
    // Return the sum of the arguments
    return args.reduce(function(a, b) {
      return a + b
    }, 0);
}  


