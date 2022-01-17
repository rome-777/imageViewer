const db = require('./db');

// Sync and Seed
const syncAndSeed = async () => {
    await db.sync({ force: true })
};

module.exports = {
    db,
    syncAndSeed,
    models: {
    }
};
