import express from "express";
import {setupApp} from "../src/setup-app";
import {PostInputModel} from "../src/types/post-input-model";
import {dataRepository} from "../src/repository/blogger-repository";
import request from "supertest";
import {POSTS_PATH} from "../src/routers/router-pathes";
import {HttpStatus} from "../src/core/http-statuses";

describe("Test API for managing post inside blogs", () =>{
    const testApp = express();
    setupApp(testApp);

    const correctPostInput: PostInputModel = {
        title: "post blog 003",
        shortDescription: "o4erednoy post ni o 4em",
        content: "Eto testovoe napolnenie posta 001_003",
        blogId: "001"
    };

    it("GET '/api/posts/' - should respond with a list of posts (4 entries total)", async() => {

        expect(dataRepository.returnLength()).toBe(2);

        const res = await request(testApp).get(`${POSTS_PATH}/`);

        const entriesCount = Object.entries(res.body).length;
        expect(entriesCount).toBe(4);

        expect(res.status).toBe(HttpStatus.Ok);
    });

    it("POST '/api/posts/' - should add a post to the repository", async() => {

        const res = await request(testApp).post(`${POSTS_PATH}/`).send(correctPostInput);

        const propertyCount = Object.keys(res.body).length;

        // console.log("FOR DEBUGGING: ", res.body); // for debug purposes

        expect(propertyCount).toBe(6);

        expect(res.body.id).toBeDefined();
        expect(res.body.blogName).toBeDefined();

        expect(typeof res.body.id).toBe('string');
        expect(typeof res.body.blogName).toBe('string');

        expect(res.body).toHaveProperty('title', 'post blog 003');
        expect(res.body).toHaveProperty('shortDescription', 'o4erednoy post ni o 4em');
        expect(res.body).toHaveProperty('content', 'Eto testovoe napolnenie posta 001_003');
        expect(res.body).toHaveProperty('blogId', '001');
        expect(res.body).toHaveProperty('blogName', 'blogger_001');

        expect(res.status).toBe(HttpStatus.Created);
    });

    it("GET '/api/posts/{id}' - should respond with a PostViewModel-formatted info about a requested post", async() => {

        const res = await request(testApp).get(`${POSTS_PATH}/002_001`);

        const propertyCount = Object.keys(res.body).length;
        expect(propertyCount).toBe(6);

        expect(res.body).toHaveProperty('id', '002_001');
        expect(res.body).toHaveProperty('title', 'post blog 001');
        expect(res.body).toHaveProperty('shortDescription', 'horowii post');
        expect(res.body).toHaveProperty('content', 'Eto testovoe napolnenie posta 002_001');
        expect(res.body).toHaveProperty('blogId', '002');
        expect(res.body).toHaveProperty('blogName', 'blogger_002');

        expect(res.status).toBe(HttpStatus.Ok);
    });

    it("PUT '/api/posts/{id}' - should update a post", async() => {

        const updatedPostInput: PostInputModel = {
            title: "post blog 001",
            shortDescription: "OBNOVLENNII post - ni o 4em",
            content: "Eto OBNOVLENNOE testovoe napolnenie posta 001_003",
            blogId: "002"
        };

        const res = await request(testApp).put(`${POSTS_PATH}/002_001`).send(updatedPostInput);
        expect(res.status).toBe(HttpStatus.NoContent);

        const anotherResults = await request(testApp).get(`${POSTS_PATH}/002_001`);
        expect(anotherResults).toBeDefined();
        const propertyCount = Object.keys(anotherResults.body).length;
        expect(propertyCount).toBe(6);
        expect(anotherResults.status).toBe(HttpStatus.Ok);

        expect(anotherResults.body).toHaveProperty('id', '002_001');
        expect(anotherResults.body).toHaveProperty('title', 'post blog 001');
        expect(anotherResults.body).toHaveProperty('shortDescription', 'OBNOVLENNII post - ni o 4em');
        expect(anotherResults.body).toHaveProperty('content', 'Eto OBNOVLENNOE testovoe napolnenie posta 001_003');
        expect(anotherResults.body).toHaveProperty('blogId', '002');
        expect(anotherResults.body).toHaveProperty('blogName', 'blogger_002');
    });

    it("DELETE '/api/posts/{id}' - should delete a post", async() => {
        // expect(dataRepository.returnLength()).toBe(3);

        const res = await request(testApp).delete(`${POSTS_PATH}/002_001`);
        expect(res.status).toBe(HttpStatus.NoContent);

        const anotherResults = await request(testApp).get(`${POSTS_PATH}/002_001`);
        expect(anotherResults.status).toBe(HttpStatus.NotFound);
    });

});