import mongoose from "mongoose";
import request from "supertest";
import dotenv from "dotenv";
import app from "../server";
import connectDB from "../db/connectDB";
import { StatusCodes } from "http-status-codes";
import createJWT from "../utils/createJWT";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const baseURL = "/api/v1/posts";

const testUser = {
  firstName: "TestUser1",
  lastName: "testuser",
  email: "testuser@gmail.com",
  password: "$2b$16$NslDsEK3xhyM/1Ma1HD/BexT/SD8x873YZ0wJ/BgDxO96QlzS3LkW",
  profilePicture: "",
  friends: [],
  viewedProfile: 852,
  impressions: 511,
  role: "user",
  _id: "65014e03c9d94c929313f6f2",
  createdAt: "2023-09-13T05:52:03.512Z",
  updatedAt: "2023-09-13T05:52:03.512Z",
  __v: 0,
};
const token = createJWT(testUser);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let postId;

/* Connecting to the database before all test. */
beforeAll(async () => {
  await connectDB(process.env.MONGO_URI);
}, 30000);

/* Closing database connection after all test. */
afterAll(async () => {
  await mongoose.connection.close();
});

describe(`GET ${baseURL}`, () => {
  it("should return all feeds posts", async () => {
    const res = await request(app)
      .get(baseURL)
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(StatusCodes.OK);
    expect(res.body.totalPosts).toBeGreaterThan(0);
  });
});

describe(`POST ${baseURL}`, () => {
  it("should create a post without image", async () => {
    const res = await request(app)
      .post(`${baseURL}`)
      .set("Authorization", `Bearer ${token}`)
      .field("description", "Ok it is");

    expect(res.statusCode).toBe(StatusCodes.CREATED);
  });
});

describe(`POST ${baseURL}`, () => {
  it("should create a post with image", async () => {
    const res = await request(app)
      .post(`${baseURL}`)
      .set("Authorization", `Bearer ${token}`)
      .field("description", "Ok it is")
      .attach("image", `${__dirname}/resources/image.jpg`);
    expect(res.statusCode).toBe(StatusCodes.CREATED);
  });
});

describe(`GET ${baseURL}/user-posts/65014e03c9d94c929313f6f2`, () => {
  it("should return all the posts by a given user", async () => {
    const res = await request(app)
      .get(`${baseURL}/user-posts/65014e03c9d94c929313f6f2`)
      .set("Authorization", `Bearer ${token}`);
    postId = res.body.posts[0]._id;
    expect(res.statusCode).toBe(StatusCodes.OK);
  });
});
describe(`GET ${baseURL}`, () => {
  it("should return a single post", async () => {
    const res = await request(app)
      .get(`${baseURL}/${postId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(StatusCodes.OK);
  });
});

describe(`PATCH ${baseURL}/650150791b175e73198e2e9a`, () => {
  it("should update a post description", async () => {
    const res = await request(app)
      .patch(`${baseURL}/${postId}`)
      .set("content-type", "multipart/form-data")
      .set("Authorization", `Bearer ${token}`)
      .field("description", "Hello world");
    expect(res.statusCode).toBe(StatusCodes.OK);
  });
});
describe(`GET ${baseURL}`, () => {
  it("should update a post description and image", async () => {
    const res = await request(app)
      .patch(`${baseURL}/${postId}`)
      .set("content-type", "multipart/form-data")
      .set("Authorization", `Bearer ${token}`)
      .field("description", "Hello world")
      .attach("image", `${__dirname}/resources/image.jpg`);
    expect(res.statusCode).toBe(StatusCodes.OK);
  });
});

describe(`POST ${baseURL}/${postId}/like`, () => {
  it("should like a post", async () => {
    const res = await request(app)
      .patch(`${baseURL}/${postId}/like`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(StatusCodes.OK);
  });
});

describe(`GET ${baseURL}`, () => {
  it("should delete a single post", async () => {
    const res = await request(app)
      .delete(`${baseURL}/${postId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(StatusCodes.OK);
  });
});
