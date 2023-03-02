import test from 'ava';
import sinon from 'sinon';
import DriverService from '../../services/DriverService';
import CarService from '../../services/CarService';
import RentACarService from '../../services/RentACarService';

const stub = { ...test };

stub.serial.afterEach(() => {
    sinon.restore();
});

stub.serial.skip(
    'test a register method for create of one rent - sucess case',
    async (t) => {
        const instance = new RentACarService();
        const mockSave = sinon
            .stub(instance['rentACarRepository'], <any>'save')
            .resolves({} as any);

        const mockCreate = sinon
            .stub(instance['rentACarRepository'], <any>'create')
            .returns('Create');

        const mockFindRentByDriver = sinon
            .stub(instance, 'findRentByDriver')
            .resolves({
                rentByDriver: {
                    driver: { id: 'idRentByDriver' },
                    active: true,
                },
            } as any);

        const mockFindRentByCar = sinon
            .stub(instance, 'findRentByCar')
            .resolves({
                rentByDriver: { car: { id: 'idRentByCar' }, active: true },
            } as any);

        const instanceCarService = new CarService();

        const mockFindByIdCarService = sinon
            .stub(instanceCarService, 'findById')
            .resolves({ id: 'idFindByCarService' } as any);

        const instanceDriverService = new DriverService();

        const mockFindByIdDriverService = sinon
            .stub(instanceDriverService, 'findById')
            .resolves({ id: 'idFindByIdDriverService' } as any);

        const result = await instance.register(
            'driverId',
            'carId',
            'description',
        );

        t.true(mockCreate.called);
    },
);

stub.serial(
    'test a "findRentByDriver" method to find a rental by driver in sucess case',
    async (t) => {
        const instance = new RentACarService();

        const mockFindOne = sinon
            .stub(instance['rentACarRepository'], <any>'findOne')
            .resolves({ driver: { id: 'driverId' } });

        const result = await instance.findRentByDriver('driverId');

        t.true(
            mockFindOne.calledOnceWithExactly({
                where: {
                    driver: {
                        id: 'driverId',
                    },
                },
                relations: {
                    car: true,
                    driver: true,
                },
            }),
        );

        t.deepEqual(result, { driver: { id: 'driverId' } } as any);
    },
);

stub.serial(
    'test a method "findRentByDriver" to find a rent by driver in case where this record does not exist',
    async (t) => {
        const instance = new RentACarService();

        const mockFindOne = sinon
            .stub(instance['rentACarRepository'], <any>'findOne')
            .resolves(null);

        const result = await instance.findRentByDriver('idinexistente');

        t.true(
            mockFindOne.calledOnceWithExactly({
                where: {
                    driver: {
                        id: 'idinexistente',
                    },
                },
                relations: {
                    car: true,
                    driver: true,
                },
            }),
        );

        t.deepEqual(result, null);
    },
);

stub.serial(
    'test a "findRentByCar" method to find a rental by driver in sucess case',
    async (t) => {
        const instance = new RentACarService();

        const mockFindOne = sinon
            .stub(instance['rentACarRepository'], <any>'findOne')
            .resolves({ car: { id: 'carId' } });

        const result = await instance.findRentByCar('carId');

        t.true(
            mockFindOne.calledOnceWithExactly({
                where: {
                    car: {
                        id: 'carId',
                    },
                },
                relations: {
                    car: true,
                    driver: true,
                },
            }),
        );
        t.deepEqual(result, { car: { id: 'carId' } } as any);
    },
);

stub.serial(
    'test a method "findRentByCar" to find a rent by car in case where this record does not exist',
    async (t) => {
        const instance = new RentACarService();

        const mockFindOne = sinon
            .stub(instance['rentACarRepository'], <any>'findOne')
            .resolves(null);

        const result = await instance.findRentByCar('idinexistente');

        t.true(
            mockFindOne.calledOnceWithExactly({
                where: {
                    car: {
                        id: 'idinexistente',
                    },
                },
                relations: {
                    car: true,
                    driver: true,
                },
            }),
        );

        t.deepEqual(result, null);
    },
);

stub.serial('test a "find" method find all rentals', async (t) => {
    const instance = new RentACarService();

    const mockFind = sinon
        .stub(instance['rentACarRepository'], <any>'find')
        .resolves([]);

    const result = await instance.find();

    t.true(
        mockFind.calledOnceWithExactly({
            relations: {
                car: true,
                driver: true,
            },
        }),
    );
    t.true(mockFind.calledOnce);
});

stub.serial(
    'test a "update" method to finish a rental sucess case',
    async (t) => {
        const instance = new RentACarService();

        const rent = {
            active: true,
            endRent: '',
        };

        const mockFindOne = sinon
            .stub(instance['rentACarRepository'], <any>'findOne')
            .resolves(rent);

        const mockSave = sinon
            .stub(instance['rentACarRepository'], <any>'save')
            .resolves('save');

        const result = await instance.update('rentId');

        t.true(
            mockFindOne.calledOnceWithExactly({
                where: {
                    id: 'rentId',
                },
                relations: {
                    car: true,
                    driver: true,
                },
            }),
        );
        t.true(mockFindOne.calledOnce);
        t.true(mockSave.calledAfter(mockFindOne));
        t.true(mockSave.calledOnceWithExactly(rent));

        t.deepEqual(result, rent);
    },
);

stub.serial(
    'test a "update" method to finish a rental fail case',
    async (t) => {
        const instance = new RentACarService();

        const mockFindOne = sinon
            .stub(instance['rentACarRepository'], <any>'findOne')
            .resolves({ active: false });

        const mockSave = sinon
            .stub(instance['rentACarRepository'], <any>'save')
            .resolves('save');

        try {
            await instance.update('rentId');
        } catch (e) {
            t.true(e instanceof Error);
        }

        t.true(
            mockFindOne.calledOnceWithExactly({
                where: {
                    id: 'rentId',
                },
                relations: {
                    car: true,
                    driver: true,
                },
            }),
        );
        t.true(mockFindOne.calledOnce);
        t.true(mockSave.notCalled);
    },
);
