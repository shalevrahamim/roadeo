const Sequelize = require('sequelize');
const config = require('./config');

const db = new Sequelize(config.DB, config.USER_NAME, config.PASSWORD, {
    host: config.HOST,
    dialect: config.DIALECT,
    logging: false
})

const sync = async () => {
    try{
        return await db.sync()
    } catch(error){
        throw error;
    }
};

module.exports = {
    sync,
}