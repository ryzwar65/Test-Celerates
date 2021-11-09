const request = require("supertest");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const app = require("../app");
const db = require('../database/connection')
let auth = {}

beforeEach(async () => {
    const hashedPassword = await bcrypt.hash("12345", 10);
    await db('users').insert([
        {
          username:"admin1",
          password:hashedPassword
        }
    ]);
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        username: "admin1",
        password: "12345"
      });
    auth.token = response.body.token; 
});

afterEach(async () => {
 await db('users').where('username',"admin1").delete()
});

describe("GET /books without auth", () => {
    test("requires login", async () => {        
        const response = await request(app).get("/api/books?page[limit]=10&page[offset]=0");        
        expect(response.status).toBe(401);        
        expect(response.body).toStrictEqual({
            "status": "401",
            "error": "Not Authorized"
        });
    });
});

describe("GET /books with auth", () => {
    test("return list books", async () => {        
        const response = await request(app).get("/api/books?page[limit]=10&page[offset]=0").set("authorization", "Bearer "+auth.token);                    
        expect(response.statusCode).toBe(201);
    });
});

describe("POST /books without auth", () => {
    test("requires login", async () => {        
        const response = await request(app).get("/api/books/").send({            
            "data":{
                "attributes":{
                    "writer":"Jhon Doe",
                    "publisher":"Gramedia",
                    "book_name":"Magic University",
                    "date_publish":"2020-12-10",
                    "id_category":1
                }
            }
        });        
        expect(response.status).toBe(401);        
        expect(response.body).toStrictEqual({
            "status": "401",
            "error": "Not Authorized"
        });
    });
});

describe("POST /books with auth", () => {
    test("return 201", async () => {        
        const response = await request(app).post("/api/books/").set('Accept', 'application/json').send({            
            "data":{
                "attributes":{
                    "writer":"Jhon Doe",
                    "publisher":"Gramedia",
                    "book_name":"Magic University",
                    "date_publish":"2020-12-10",
                    "id_category":1
                }
            }
        }).set("authorization","Bearer "+auth.token);        
        expect(response.statusCode).toBe(201);
    });
});

describe("GET /books/:id without auth", () => {
    test("requires login", async () => {        
        const response = await request(app).get("/api/books/5");        
        expect(response.status).toBe(401);        
        expect(response.body).toStrictEqual({
            "status": "401",
            "error": "Not Authorized"
        });
    });
});

describe("GET /books/:id with auth", () => {
    test("return books by Id", async () => {        
        const response = await request(app).get("/api/books/5").set("authorization", "Bearer "+auth.token);                    
        expect(response.statusCode).toBe(201);
    });
});

describe("PATCH /books/:bookId/update/category/:categoryId without auth", () => {
    test("requires login", async () => {        
        const response = await request(app).patch("/api/books/16/update/category/1");        
        expect(response.status).toBe(401);        
        expect(response.body).toStrictEqual({
            "status": "401",
            "error": "Not Authorized"
        });
    });
});

describe("PATCH /books/:bookId/update/category/:categoryId with auth", () => {
    test("return 201", async () => {        
        const response = await request(app).patch("/api/books/16/update/category/1").set('Accept', 'application/json').send({            
            "data":{
                "attributes":{
                    "writer":"Jhon Doe",
                    "publisher":"Gramedia",
                    "book_name":"Magic University",
                    "date_publish":"2020-12-10",
                    "id_category":6
                }
            }
        }).set("authorization","Bearer "+auth.token);                   
        expect(response.statusCode).toBe(201);
    });
});

describe("DELETE /books/:bookId/ without auth", () => {
    test("requires login", async () => {        
        const response = await request(app).delete("/api/books/20");        
        expect(response.status).toBe(401);        
        expect(response.body).toStrictEqual({
            "status": "401",
            "error": "Not Authorized"
        });
    });
});

describe("DELETE /books/:bookId/ with auth", () => {
    test("return 201", async () => {        
        const response = await request(app).delete("/api/books/20").set('Accept', 'application/json')
        .set("authorization","Bearer "+auth.token);                   
        expect(response.statusCode).toBe(201);
    });
});