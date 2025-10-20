import { afterAll, beforeAll, expect, it } from "@jest/globals";
import request from "supertest";
import app from "../app.js";
import connectedDB from "../config/db.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

beforeAll(async () => {
  dotenv.config();
  await connectedDB();
});

describe("Auth API", () => {
  it("With correct email and password, should login successfully with correct credentials", async () => {
    const res = await request(app)
      .post("/api/register/login")
      .send({ email: "one@gmail.com", password: "1234" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  it("With incorrect email or password, should response with correct status code and not have credentials", async () => {
    const incorrectEmailRes = await request(app)
      .post("/api/register/login")
      .send({ email: "incorrect@gmail.com", password: "WRONG-PASSWORD" });

    expect(incorrectEmailRes.statusCode).toBe(400);
    expect(incorrectEmailRes.body).not.toHaveProperty("token");

    const incorrectPasswordRes = await request(app)
      .post("/api/register/login")
      .send({ email: "one@gmail.com", password: "WRONG-PASSWORD" });

    expect(incorrectPasswordRes.statusCode).toBe(400);
    expect(incorrectPasswordRes.body).not.toHaveProperty("token");
  });

  it("Without sending body, should response with correct status code and not have credentials", async () => {
    const res = await request(app).post("/api/register/login");

    expect(res.statusCode).toBe(400);
    expect(res.body).not.toHaveProperty("token");
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
