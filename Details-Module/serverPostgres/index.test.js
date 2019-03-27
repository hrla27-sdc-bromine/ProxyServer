const { app, launchApp } = require('./app');
const request = require('supertest');


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

describe('API CRUD Operations', () => {
  beforeAll(async () => {
    await launchApp();
  });
  test('server responds to GET request', async () => {
    let productId = Math.floor(Math.random() * 1e6 + 9e6);
    let response = await request(app).get(`/abibas/product/${productId}`);
    return expect(response.body).toEqual(
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
  });

  test('server responds to POST request', async () => {
    let response = await request(app)
      .post('/abibas/product')
      .send(testProduct);
    expect(response.body.productId).toBeGreaterThan(9999999);
    delete response.body.productId;
    return expect(response.body).toEqual(testProduct);
  });

  test('server responds to PUT request', async () => {
    let productId = Math.floor(Math.random() * 1e6 + 9e6);
    await request(app)
      .put(`/abibas/product/${productId}`)
      .send(testProduct);
    let response = await request(app).get(`/abibas/product/${productId}`);
    delete response.body.productId;
    return expect(response.body).toEqual(testProduct);
  });

  test('server responds to DELETE request', async () => {
    let productId = Math.floor(Math.random() * 1e6 + 9e6);
    let deleteResponse = await request(app).delete(
      `/abibas/product/${productId}`
    );
    expect(deleteResponse.status).toBe(200);
    let getResponse = await request(app).get(`/abibas/product/${productId}`);
    return expect(getResponse.status).toBe(404);
  });
})