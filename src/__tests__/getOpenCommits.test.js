const getOpenCommits = require('../lambda/getOpenCommits')
const eventGenerator = require('../../testUtils/eventGenerator')
const validator = require('../../testUtils/validator')

describe('create open commits integration test', () => {
    test('it should take a body and return an API Gateway response if url is a valid github repo', async () =>{
        const event = eventGenerator({
            body: {
                url: 'https://api.github.com/repos/colinhacks/zod/'
            }
        })

        const res = await getOpenCommits.handler(event);

        expect(res).toBeDefined();
        expect(validator.isApiGatewayResponse(res)).toBe(true);
        expect(res.statusCode).toBe(200);
        const body = JSON.parse(res.body);
        expect(typeof body.openRepos).toEqual('object');
    });

    test('should return 400 with commits if url is invalid', async () => {
        const event = eventGenerator({
            body: {
                url: 'https://api.gith'
            }
        })
        const res = await getOpenCommits.handler(event);
        expect(res.statusCode).toBe(400);
    });

    test('should return empty body if url is valid but incomplete', async () => {
        const event = eventGenerator({
            body: {
                url: 'https://api.github.com/repos/'
            }
        })
        const res = await getOpenCommits.handler(event);
        expect(res.statusCode).toBe(200);
        const body = JSON.parse(res.body);
        expect(typeof body).toEqual('object');
    });
});