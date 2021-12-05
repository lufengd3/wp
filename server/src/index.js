const Hapi = require('@hapi/hapi');
// const fs = require('fs');
const fs = require('./utils/fs');

const init = async () => {
    const server = Hapi.server({
        port: 6789,
        host: '0.0.0.0',
        routes: {
            cors: true
        }
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: async (request, h) => {
          const result = await fs.readFile();
          
          return result;
        }
    });

    server.route({
        method: 'GET',
        path: '/update',
        handler: async (request, h) => {
            const { url } = request.query;
            console.log(url);

            const result = await fs.writeFile(url);
            
            return result;
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();