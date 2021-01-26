import test from 'tape';
import axios from 'axios';

const BASE_URL = 'http://localhost:3000';


test('Endpoint get /', async(t) => {

    const EXPECTED = '<h1>Prova Backend Helpper<h1>';
    const RESULT = await axios.get(BASE_URL);


    t.deepEqual(RESULT.data, EXPECTED);
    t.end();
});

test('Endpoint post', async(t) => {
    const DATA = 
        {
            name:'Felipe',
            username:'felipesantos',
            email:'feipe.santos@email.com'
        }


    const RESULT = await axios.post(`${BASE_URL}/user`, DATA);

    const EXPECTED = 200;

    t.deepEqual(RESULT.status,EXPECTED);
    t.end();
});

test('Endpoint get /user', async(t) => {

    const EXPECTED = 200;
    const RESULT = await axios.get(`${BASE_URL}/user`);


    t.deepEqual(RESULT.status, EXPECTED);
    t.end();
});

