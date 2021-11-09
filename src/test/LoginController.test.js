const request = require("supertest");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const app = require("../app");
const db = require('../database/connection')
let auth = {}

describe("POST /login", () => {
    test("Login User Not Found", async () => {        
        const response = await request(app).post("/api/auth/login").send({
            username: "admin1",
            password: "12345"
        });
        expect(response.status).toBe(404);        
        expect(response.body).toStrictEqual({
            "status": "404",
            "error": "user does not exist"
        });
    });
});

describe("POST /login", () => {
    test("Login User Is Found", async () => {        
        const response = await request(app).post("/api/auth/login").send({
            username: "admin",
            password: "12345"
        });
        expect(response.status).toBe(201);
    });
});