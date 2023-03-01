import test from 'ava';
import sinon from 'sinon';
import request from 'supertest';
import App from '../../app';
import CarService from '../../services/CarService';

const stub = { ...test };

stub.serial.afterEach(() => {
    sinon.restore();
});

stub.serial('PUT /api/v1/car/update/:id - success case', async (t) => {
    sinon.stub(CarService.prototype, 'update').resolves({} as any);

    const response = await request(App)
        .put('/api/v1/car/update/a4380416-aab3-498b-87c8-ce2484a36f35')
        .send({ color: 'red', brand: 'volks', licensePlate: 'ABC2222' });

    t.is(response.status, 200);
});

stub.serial('PUT /api/v1/car/update/:id - fail case', async (t) => {
    sinon.stub(CarService.prototype, 'update').resolves({} as any);

    const response = await request(App)
        .put('/api/v1/car/update/notUUid')
        .send({ color: 'red', brand: 'volks', licensePlate: 'ABC2222' });

    t.is(response.status, 400);
});

stub.serial('POST /api/v1/car/register - success case', async (t) => {
    sinon.stub(CarService.prototype, 'register').resolves({} as any);

    const response = await request(App)
        .post('/api/v1/car/register')
        .send({ color: 'red', brand: 'volks', licensePlate: 'ABC1234' });

    t.is(response.status, 201);
});

stub.serial('POST /api/v1/car/register - fail case', async (t) => {
    sinon.stub(CarService.prototype, 'register').resolves({} as any);

    const response = await request(App)
        .post('/api/v1/car/register')
        .send({ color: 'red', brand: 'volks', licensePlate: 'ABC2' });

    t.is(response.status, 400);
});
