import request from 'supertest';
import app from '../src/index';

describe('GET /notifications', () => {
  it('401 tanpa bearer', async () => {
    const r = await request(app).get('/notifications');
    expect(r.status).toBe(401);
  });

  it('200 sukses', async () => {
    const r = await request(app)
      .get('/notifications')
      .set('Authorization', 'Bearer test123');
    expect(r.status).toBe(200);
    expect(Array.isArray(r.body.data)).toBe(true);
    expect(typeof r.body.total).toBe('number');
  });
});