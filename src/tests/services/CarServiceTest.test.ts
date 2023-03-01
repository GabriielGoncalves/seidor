import test from 'ava';
import sinon from 'sinon';
import CarService from '../../services/CarService';
const stub = { ...test };

stub.serial.afterEach(() => {
    sinon.restore();
});

stub.serial('test a register method for create a valid user', async (t) => {
    const instance = new CarService();
    const mockSave = sinon
        .stub(instance['carRepository'], <any>'save')
        .resolves('save');
    const mockCreate = sinon
        .stub(instance['carRepository'], <any>'create')
        .returns('Create');

    const result = await instance.register({ color: 'blue' } as any);

    t.true(mockCreate.calledOnceWithExactly({ color: 'blue' } as any));
    t.true(mockSave.calledOnceWithExactly('Create'));
    t.is(result, 'Create' as any);
});

stub.serial('test a update method in success case', async (t) => {
    const carToUpgrade = {
        color: 'blue',
        brand: 'volks',
        licensePlate: 'asdrfgt',
    };
    const instance = new CarService();

    const mockSave = sinon
        .stub(instance['carRepository'], <any>'save')
        .resolves('save');

    const mockFindOne = sinon
        .stub(instance['carRepository'], <any>'findOne')
        .resolves(carToUpgrade);

    const result = await instance.update('id', {
        color: 'red',
        brand: 'fiat',
        licensePlate: 'aaaaaaa',
    });

    t.deepEqual(result, {
        color: 'red',
        brand: 'fiat',
        licensePlate: 'aaaaaaa',
    } as any);

    t.true(
        mockFindOne.calledOnceWithExactly({
            where: {
                id: 'id',
            },
        }),
    );
    t.true(mockSave.calledOnceWithExactly(result));
});

stub.serial('test a update method in fail case', async (t) => {
    const instance = new CarService();

    const mockFindOne = sinon
        .stub(instance['carRepository'], <any>'findOne')
        .resolves(false);

    try {
        await instance.update('idnaoexistente', {
            color: 'red',
            brand: 'fiat',
            licensePlate: 'aaaaaaa',
        });
    } catch (e) {
        t.true(e instanceof Error);
    }
    t.true(
        mockFindOne.calledOnceWithExactly({ where: { id: 'idnaoexistente' } }),
    );
});

stub.serial('test a delete method in success case', async (t) => {
    const instance = new CarService();

    const mockFindOne = sinon
        .stub(instance['carRepository'], <any>'findOne')
        .resolves({} as any);

    const mockRemove = sinon
        .stub(instance['carRepository'], <any>'remove')
        .resolves({} as any);

    await instance.delete('id');

    t.true(
        mockFindOne.calledOnceWithExactly({
            where: {
                id: 'id',
            },
        }),
    );

    t.true(mockRemove.calledOnceWithExactly({}));
});

stub.serial('test a delete method in fail case', async (t) => {
    const instance = new CarService();

    const mockRemove = sinon
        .stub(instance['carRepository'], <any>'remove')
        .resolves({} as any);

    const mockFindOne = sinon
        .stub(instance['carRepository'], <any>'findOne')
        .resolves(false);

    try {
        await instance.delete('idnaoexistente');
    } catch (e) {
        t.true(e instanceof Error);
    }
    t.true(
        mockFindOne.calledOnceWithExactly({ where: { id: 'idnaoexistente' } }),
    );

    t.true(mockRemove.notCalled);
});
