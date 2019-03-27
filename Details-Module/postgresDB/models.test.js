const faker = require('faker');
const { dbFetch, dbDelete, dbUpdate, dbCreate } = require('./models.js');

let testProduct = {
  name: 'Unbranded Soft Towels',
  images: [
		'https://picsum.photos/1000/1000?image=57',
		'https://picsum.photos/1000/1000?image=58',
		'https://picsum.photos/1000/1000?image=59',
		'https://picsum.photos/1000/1000?image=60',
		'https://picsum.photos/1000/1000?image=61',
		'https://picsum.photos/1000/1000?image=62',
		'https://picsum.photos/1000/1000?image=63',
		'https://picsum.photos/1000/1000?image=64'
  ],
  sizes: {
		'5': 4,
		'6': 7,
		'7': 0,
		'8': 8,
		'9': 2,
		'10': 9,
		'11': 2,
		'12': 10,
		'13': 1,
		'5h': 2,
		'6h': 10,
		'7h': 6,
		'8h': 4,
		'9h': 4,
		'10h': 1,
		'11h': 10,
		'12h': 8
	},
  retailPrice: 100,
  salePrice: 36,
  reviewCount: 53,
  reviewRating: 4.26554,
  tags: ['Home'],
	colors: ['black', 'gold' , 'blue'],
	availableColors: [46712, 46713],
  heartToggle: false
};
describe('DB CRUD Operations', () => {
  beforeAll(async () => {
    // eliminate initial connection setup from times
    await dbFetch(46712);
  });
  test('can fetch from DB by ID', async () => {
    let idTimes = [];
    for (let i = 0; i < 100; i++) {
      let productId = Math.floor(Math.random() * 1e7);
      let readStart = process.hrtime();
      let product = await dbFetch(productId);
      idTimes.push(process.hrtime(readStart)[1] / 1e6);
      expect(product).toEqual(
        expect.objectContaining({
          productId: expect.any(Number),
          name: expect.any(String),
          images: expect.any(Array),
          sizes: expect.any(Object),
          retailPrice: expect.any(Number),
          salePrice: expect.any(Number),
          reviewCount: expect.any(Number),
          reviewRating: expect.any(Number),
					tags: expect.any(Array),
					colors: expect.any(Array),
					availableColors: expect.any(Array),
          heartToggle: expect.any(Boolean)
        })
      );
    }
    return console.log(
      'AVG ID READ TIME IN (ms):',
      idTimes.reduce((acc, time) => acc + time, 0) / idTimes.length
    );
  });

  test('can fetch from DB by productName', async () => {
    let nameTimes = [];
    for (let i = 0; i < 100; i++) {
      let productName = faker.commerce.productName();
      let readStart = process.hrtime();
      let product = await dbFetch(productName);
      nameTimes.push(process.hrtime(readStart)[1] / 1e6);
      expect(product).toEqual(
        expect.objectContaining({
          productId: expect.any(Number),
          name: expect.any(String),
          images: expect.any(Array),
          sizes: expect.any(Object),
          retailPrice: expect.any(Number),
          salePrice: expect.any(Number),
          reviewCount: expect.any(Number),
          reviewRating: expect.any(Number),
          tags: expect.any(Array),
					colors: expect.any(Array),
					availableColors: expect.any(Array),
          heartToggle: expect.any(Boolean)
        })
      );
    }
    return console.log(
      'AVG NAME READ TIME IN (ms):',
      nameTimes.reduce((acc, time) => acc + time, 0) / nameTimes.length
    );
  });

  test('can create new product', async () => {
    let times = [];
    for (let i = 0; i < 100; i++) {
      let createStart = process.hrtime();
      let productId = await dbCreate(testProduct);
      times.push(process.hrtime(createStart)[1] / 1e6);
      let newProduct = await dbFetch(productId);
      expect(newProduct).toEqual(
        Object.assign(
          {
            productId
          },
          testProduct
        )
      );
    }
    return console.log(
      'AVG CREATE TIME IN (ms):',
      times.reduce((acc, time) => acc + time, 0) / times.length
    );
  });

  test('can update product', async () => {
    let times = [];
    for (let i = 0; i < 100; i++) {
      let productId = Math.floor(Math.random() * 1e7);
      let updateStart = process.hrtime();
      await dbUpdate(productId, testProduct);
      times.push(process.hrtime(updateStart)[1] / 1e6);
      let updatedProduct = await dbFetch(productId);
      delete updatedProduct.productId;
      expect(updatedProduct).toEqual(testProduct);
    }
    return console.log(
      'AVG UPDATE TIME IN (ms):',
      times.reduce((acc, time) => acc + time, 0) / times.length
    );
  });

  test('can delete product', async () => {
    let times = [];
    for (let i = 0; i < 100; i++) {
      let productId = Math.floor(Math.random() * 1e7);
      let deleteStart = process.hrtime();
      let res = await dbDelete(productId);
      times.push(process.hrtime(deleteStart)[1] / 1e6);
      let response = await dbFetch(productId);
      expect(response).toBe(undefined);
    }
    return console.log(
      'AVG DELETE TIME IN (ms):',
      times.reduce((acc, time) => acc + time, 0) / times.length
    );
  });
});