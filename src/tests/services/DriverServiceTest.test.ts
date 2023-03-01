import test from 'ava';
import sinon from 'sinon';
import DriverService from '../../services/DriverService';

const stub = { ...test };

stub.serial.afterEach(() => {
    sinon.restore();
});

stub.serial(
    'test a "register" method for create a driver in sucess case',
    async (t) => {
        const instance = new DriverService();

        const mockSave = sinon
            .stub(instance['driverRepository'], <any>'save')
            .resolves('save');

        const mockCreate = sinon
            .stub(instance['driverRepository'], <any>'create')
            .returns({ name: 'driver name' });

        const result = await instance.register({ name: 'driver' });

        t.true(
            mockCreate.calledOnceWithExactly({
                name: 'driver name',
            }),
        );

        t.true(mockSave.calledImmediatelyAfter(mockCreate));

        t.true(mockSave.calledOnceWithExactly({ name: 'driver' }));

        t.deepEqual(result, { name: 'driver' } as any);
    },
);

stub.serial(
    'test a "update" method for change a driver in sucess case',
    async (t) => {
        const instance = new DriverService();

        const mockSave = sinon
            .stub(instance['driverRepository'], <any>'save')
            .resolves('save');

        const mockFindById = sinon
            .stub(instance, 'findById')
            .resolves({ name: 'old name' } as any);

        const result = await instance.update('driverId', { name: 'new name' });

        t.true(mockFindById.calledOnceWithExactly('driverId'));

        t.true(mockSave.calledOnceWithExactly(result));
        t.deepEqual(result, { name: 'new name' } as any);
    },
);

stub.serial(
    'test a "delete" method for remove a driver in sucess case',
    async (t) => {
        const instance = new DriverService();

        const mockRemove = sinon
            .stub(instance['driverRepository'], <any>'remove')
            .resolves({});

        const mockFindById = sinon
            .stub(instance, 'findById')
            .resolves({ name: 'driver name' } as any);

        await instance.delete('driverId');

        t.true(mockFindById.calledOnceWithExactly('driverId'));
        t.true(
            mockRemove.calledOnceWithExactly({ name: 'driver name' } as any),
        );
        t.true(mockRemove.calledAfter(mockFindById));
    },
);

stub.serial(
    'test a "findById" method for find one driver - sucess case',
    async (t) => {
        const instance = new DriverService();

        const mockFindOneBy = sinon
            .stub(instance['driverRepository'], <any>'findOneBy')
            .resolves({ name: 'driver name' } as any);

        const result = await instance.findById('driverId');

        t.true(mockFindOneBy.calledOnceWithExactly({ id: 'driverId' }));

        t.deepEqual(result, { name: 'driver name' } as any);
    },
);

stub.serial(
    'test the "find" method to find all driver - sucess case',
    async (t) => {
        const instance = new DriverService();

        const filters = {};

        const mockFindAll = sinon
            .stub(instance['driverRepository'], <any>'find')
            .resolves([] as any);

        const result = await instance.find(filters);

        t.true(mockFindAll.calledOnceWithExactly());
    },
);

stub.serial(
    'test "find" method to find some driver by name in sucess case',
    async (t) => {
        const instance = new DriverService();

        const filters = { name: 'driver name' };

        const mockFindWithFilter = sinon
            .stub(instance['driverRepository'], <any>'find')
            .resolves([]);

        const result = await instance.find(filters);

        t.true(
            mockFindWithFilter.calledOnceWithExactly({
                where: {
                    name: filters.name,
                },
            }),
        );
        t.deepEqual(result, [] as any);
    },
);

stub.serial('test a update method in fail case', async (t) => {
    const instance = new DriverService();

    const mockFindById = sinon
        .stub(instance, 'findById')
        .resolves(false as any);

    const mockSave = sinon
        .stub(instance['driverRepository'], <any>'save')
        .resolves({} as any);

    try {
        await instance.update('idnaoexistente', {
            name: 'new name',
        });
    } catch (e) {
        t.true(e instanceof Error);
    }
    t.true(mockFindById.calledOnceWithExactly('idnaoexistente'));
    t.true(mockSave.notCalled);
});

stub.serial('test a delete method in fail case', async (t) => {
    const instance = new DriverService();

    const mockFindById = sinon
        .stub(instance, 'findById')
        .resolves(false as any);

    const mockRemove = sinon
        .stub(instance['driverRepository'], <any>'remove')
        .resolves({} as any);

    try {
        await instance.delete('idnaoexistente');
    } catch (e) {
        t.true(e instanceof Error);
    }
    t.true(mockFindById.calledOnceWithExactly('idnaoexistente'));
    t.true(mockRemove.notCalled);
});

stub.serial(
    'test a findById method for find one driver in fail case',
    async (t) => {
        const instance = new DriverService();

        const mockFindOneBy = sinon
            .stub(instance['driverRepository'], <any>'findOneBy')
            .resolves(true as any);

        try {
            const result = await instance.findById('idnaoexistente');
        } catch (e) {
            t.true(e instanceof Error);
        }

        t.true(mockFindOneBy.calledOnceWithExactly({ id: 'idnaoexistente' }));
    },
);
