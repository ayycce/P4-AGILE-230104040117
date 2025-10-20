import request from 'supertest';
import app from '../src/index';

describe('POST /orders', () => {
  it('401 tanpa bearer', async () => {
    const r = await request(app).post('/orders').send({ productId: 'P1', quantity: 1 });
    expect(r.status).toBe(401);
  });

  it('400 payload salah', async () => {
    const r = await request(app)
      .post('/orders')
      .set('Authorization', 'Bearer test123')
      .send({ productId: 'P1', quantity: 0 }); // quantity < 1 invalid
    expect(r.status).toBe(400);
  });

  it('201 sukses', async () => {
    const r = await request(app)
      .post('/orders')
      .set('Authorization', 'Bearer test123')
      .send({ productId: 'P1', quantity: 2 });
    expect(r.status).toBe(201);
    expect(r.body).toHaveProperty('id');
    expect(r.body).toHaveProperty('createdAt');
  });
});