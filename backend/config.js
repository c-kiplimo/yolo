const config = {
    mongoURI: {
        production: 'mongodb://mongo-0.mongo-svc,mongo-1.mongo-svc,mongo-2.mongo-svc:27017/darkroom?replicaSet=rs0',
        development: 'mongodb://mongo-0.mongo-svc,mongo-1.mongo-svc,mongo-2.mongo-svc:27017/darkroom-dev?replicaSet=rs0',
        test: 'mongodb://mongo-0.mongo-svc,mongo-1.mongo-svc,mongo-2.mongo-svc:27017/darkroom-test?replicaSet=rs0'
    }
};

module.exports = config;
