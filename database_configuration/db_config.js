function define(name, value) {
    Object.defineProperty(exports, name, {
        value: value,
        enumerable: true
    });
}
 
define("DEBUG", true);

define("DB_COURSES_DATABASE","express_courses_db");

if (this.DEBUG) {
   // 	Development
   define("DB_HOST", "192.168.99.50");
   define("DB_PORT", "3306");
   define("DB_USER", "root");
   define("DB_PASSWORD", "");
} else {
    // Live
    define("DB_HOST", "128.199.234.228");
    define("DB_PORT", "3306");
    define("DB_USER", "Ceb");
    define("DB_PASSWORD", "MGnBJSOx7fb305195MGnBJSOx7fb305195MGnBJSOx7fb305195");    
}



