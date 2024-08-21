import request from 'supertest';
import app from '../app'; // Assurez-vous que 'app' est votre application express principale
import User from '../models/User';
import WorkHour from '../models/WorkHour';

describe('User Routes', () => {
  beforeAll(async () => {
    await User.deleteMany({});
    await WorkHour.deleteMany({});
    
    // Créez des utilisateurs fictifs pour les tests
    await User.create([
      {
        userID: '1',
        email: 'test1@example.com',
        firstName: 'Test1',
        lastName: 'User1',
        location: 'US',
      },
      {
        userID: '2',
        email: 'test2@example.com',
        firstName: 'Test2',
        lastName: 'User2',
        location: 'FR',
      },
    ]);

    // Créez des heures de travail fictives pour les tests
    await WorkHour.create([
      {
        userID: '1',
        date: new Date(),
        hours: 8,
      },
      {
        userID: '2',
        date: new Date(),
        hours: 7,
      },
    ]);
  });

  it('should get all users without passwords', async () => {
    const response = await request(app).get('/api/users');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
    response.body.forEach((user) => {
      expect(user).not.toHaveProperty('password');
    });
  });

  it('should get user geography', async () => {
    const response = await request(app).get('/api/users/geography');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      { id: 'USA', value: 1 },
      { id: 'FRA', value: 1 },
    ]);
  });

  it('should get user work hours', async () => {
    const response = await request(app).get('/api/users/workhours');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
    response.body.forEach((workHour) => {
      expect(workHour).toHaveProperty('userID');
      expect(workHour).toHaveProperty('email');
      expect(workHour).toHaveProperty('firstName');
      expect(workHour).toHaveProperty('lastName');
      expect(workHour).toHaveProperty('date');
      expect(workHour).toHaveProperty('hours');
    });
  });
});
