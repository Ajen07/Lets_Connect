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
const baseURL = "/api/v1/comments";

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
const testPost = {
  userId: "65014e03c9d94c929313f6f2",
  description:
    "bff39f8852e1ac3955d73ec54c3e4a8ddfb235ffa23aeaec1ce768f87c8accba",
  picturePath:
    "https://res.cloudinary.com/drmyq6qqu/image/upload/v1694594375/Let%27s%20Connect/tmp-1-1694594366126_gc3cee.png",
  likes: {},
  _id: "650175407ee90c64e2b12ce1",
  createdAt: "2023-09-13T08:39:28.261Z",
  updatedAt: "2023-09-13T08:39:28.261Z",
  __v: 0,
};

const testComment = {
  _id: "65017991c13b85b70679da8c",
  comment: "It was niceand sus",
  parent: null,
  userId: "65014e03c9d94c929313f6f2",
  postId: "65014e03c9d94c929313f6f2",
  depth: 0,
  createdAt: "2023-09-13T08:57:53.075Z",
  updatedAt: "2023-09-13T08:57:53.075Z",
  __v: 0,
};
const token = createJWT(testUser);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* Connecting to the database before all test. */
beforeAll(async () => {
  await connectDB(process.env.MONGO_URI);
}, 30000);

/* Closing database connection after all test. */
afterAll(async () => {
  await mongoose.connection.close();
});

describe(`GET ${baseURL}`, () => {
  it("should return all the comments", async () => {
    const res = await request(app)
      .get(baseURL)
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(StatusCodes.OK);
  });
});
describe(`GET ${baseURL}`, () => {
  it("should return all the comments of a single post", async () => {
    const res = await request(app)
      .get(`${baseURL}/posts/${testPost._id}/comments`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(StatusCodes.OK);
  });
});
describe(`POST ${baseURL}`, () => {
  it("should create a comment", async () => {
    const res = await request(app)
      .post(`${baseURL}`)
      .set("Authorization", `Bearer ${token}`)
      .field("comment", "Post is Nice")
      .field("postId", testPost._id)
      .field("isReply", "FALSE")
      .field("parentId", "sdfui");
    expect(res.statusCode).toBe(StatusCodes.CREATED);
  });
});
describe(`POST ${baseURL}`, () => {
  it("should reply a to parent comment", async () => {
    const res = await request(app)
      .post(`${baseURL}`)
      .set("Authorization", `Bearer ${token}`)
      .field("comment", "It is a replay to the comment")
      .field("postId", testPost._id)
      .field("isReply", "TRUE")
      .field("parentId", testComment._id);
    expect(res.statusCode).toBe(StatusCodes.CREATED);
  });
});
describe(`UPDATE ${baseURL}`, () => {
  it("should update the comment", async () => {
    const res = await request(app)
      .patch(`${baseURL}/${testComment._id}`)
      .set("Authorization", `Bearer ${token}`)
      .field("comment", "Post is Nice");
    expect(res.statusCode).toBe(StatusCodes.OK);
  });
});
describe(`DELETE ${baseURL}`, () => {
  it("should delete a comment", async () => {
    const res = await request(app)
      .delete(`${baseURL}/650180910e456dcfb121922b`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(StatusCodes.OK);
  });
});
