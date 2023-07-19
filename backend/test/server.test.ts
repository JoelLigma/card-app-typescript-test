import { Entry } from "@prisma/client";
import Prisma from "../src/db";
import { server } from "../src/server";

type bodyObj = {
  msg: string;
};

const nonExistingId = "123abc";

const dummyEntry: Entry = {
  id: "1001",
  title: "This is the first dummy title",
  description: "This is the first dummy description",
  created_at: new Date("2023-07-18"),
  scheduled_for: new Date("2023-07-21"),
};

beforeAll(async () => {
  // start server
  const PORT = 3002;
  await server.listen(PORT);

  // add a dummy entry
  await Prisma.entry.create({
    data: dummyEntry,
  });
});

describe("GET /get/", () => {
  it("should return all entries from the db", async () => {
    const response = await server.inject({ method: "GET", url: "/get/" });
    const body: Entry[] = await response.json();

    expect(response.statusCode).toBe(200);
    expect(body.length).toBeGreaterThan(0);
  });
});

describe("GET /get/:id", () => {
  it("should fetch a single entry when a valid id is provided", async () => {
    const response = await server.inject({ method: "GET", url: `/get/${dummyEntry.id}` });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(JSON.stringify(dummyEntry));
  });

  it("should return an error message when an invalid ID is provided", async () => {
    const response = await server.inject({ method: "GET", url: `/get/${nonExistingId}` });
    const body: bodyObj = await response.json();

    expect(response.statusCode).toBe(500);
    expect(body.msg).toEqual(`Error finding entry with id ${nonExistingId}`);
  });
});

describe("POST /create/", () => {
  it("should add a new entry to the database", async () => {
    const newEntry: Entry = {
      id: "1002",
      title: "This is a new item",
      description: "This is my description",
      created_at: new Date("2023-07-18"),
      scheduled_for: new Date("2023-07-27"),
    };

    const response = await server.inject({ method: "POST", url: "/create/", payload: newEntry });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(JSON.stringify(newEntry));
  });
});

describe("PUT /update/:id", () => {
  const updatedDummyEntry: Entry = {
    ...dummyEntry,
    title: "This is the UPDATED dummy title",
  };

  it("should update an existing entry when a valid id is provided", async () => {
    const response = await server.inject({
      method: "PUT",
      url: `/update/${dummyEntry.id}`,
      payload: updatedDummyEntry,
    });
    const body: bodyObj = await response.json();

    expect(response.statusCode).toBe(200);
    expect(body.msg).toEqual("Updated successfully");
  });

  it("should return an error message when an invalid id is provided", async () => {
    const response = await server.inject({
      method: "PUT",
      url: `/update/${nonExistingId}`,
      payload: updatedDummyEntry,
    });
    const body: bodyObj = await response.json();

    expect(response.statusCode).toBe(500);
    expect(body.msg).toEqual("Error updating");
  });
});

describe("DELETE /delete/:id", () => {
  const newEntry: Entry = {
    id: "1003",
    title: "This is another new item",
    description: "This is my description",
    created_at: new Date("2023-07-18"),
    scheduled_for: new Date("2023-07-27"),
  };

  it("should delete an entry when a valid id is provided", async () => {
    const createdEntry = await server.inject({
      method: "POST",
      url: "/create/",
      payload: newEntry,
    });

    const response = await server.inject({
      method: "DELETE",
      url: `/delete/${createdEntry.json().id}`,
    });
    const body: bodyObj = await response.json();

    expect(response.statusCode).toBe(200);
    expect(body.msg).toEqual("Deleted successfully");
  });

  it("should not delete an entry when an invalid id is provided", async () => {
    const response = await server.inject({
      method: "DELETE",
      url: `/delete/${nonExistingId}`,
    });
    const body: bodyObj = await response.json();

    expect(response.statusCode).toBe(500);
    expect(body.msg).toEqual("Error deleting entry");
  });
});

afterAll(async () => {
  await Prisma.entry.delete({ where: { id: dummyEntry.id } });
  await Prisma.entry.delete({ where: { id: "1002" } });

  await server.close();
});
