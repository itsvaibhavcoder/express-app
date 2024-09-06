import { expect, use } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
import HttpStatus from 'http-status-codes';
import App from '../../src/index'; 
import dotenv from 'dotenv';
dotenv.config({ path: 'process.env.DATABASE_TEST' }); 

let jwtToken: string;
const app = App.getApp();

describe('User APIs Test', () => {
  before(async () => {
    await mongoose.connect(process.env.DATABASE_TEST);
  });

  after(async () => {
    await mongoose.disconnect();
  });

    describe('POST /api/v1/users/register', () => {
      it('should return status 201 when a new user is added', async () => {
        const userdetails = {
          fName: 'Vaibhav',
          lName: 'Sukale',
          email: 'vaibhavsukale9449',
          password: 'vaibhav@123'
        };
        console.log(userdetails.email)
      
        try {
          const res = await request(app)
            .post('/api/v1/users/register')
            .send(userdetails)
            .expect(HttpStatus.CREATED); 
        
          expect(res.body).to.have.property('_id'); 
          expect(res.body).to.have.property('email', userdetails.email); 
        } 
        catch (error) {
          console.error('Error during the test:', error); 
        }
      });
  });

  describe('POST /api/v1/users/login', () => {
    it('should return status 200 for valid login', async () => {
      const userdetails = {
        email: 'vaibhavsukale9449@gmail.com',
        password: 'vaibhav@123'
      };
      try {
        const response = await request(app)
        .post('/api/v1/users/login')
        .send(userdetails)
        .expect(HttpStatus.OK);
      jwtToken = response.body.token; 
      expect(jwtToken).to.be.a('string'); 
      } 
      catch (error) {
        console.error('Error during the test:', error);
      }
    });
  });
  
  describe('POST /api/v1/notes', () => {
    it('should return status 200 when a note is created', async () => {
      const noteDetails = {
        Title: 'Note Title',
        Dest: 'email',
        color: 'blue'
      };
      await request(app)
        .post('/api/v1/notes')
        .set('Authorization', `Bearer ${jwtToken}`)
        .send(noteDetails)
        .expect(HttpStatus.OK);
    });
  });
  
  

  
});