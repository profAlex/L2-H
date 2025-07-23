import request from 'supertest';
import express from "express";
import {setupApp} from "../src/setup-app";
import {BlogInputModel} from "../src/types/blog-input-model";
import {BLOGS_PATH, TESTING_PATH} from "../src/routers/router-pathes";
import {dataRepository} from "../src/repository/blogger-repository";
import {HttpStatus} from "../src/core/http-statuses";

describe("Test API", () =>{

    // preliminary part of tests, creating correct and incorrect data for future

    const testApp = express();
    setupApp(testApp);

    const correctBlogInput: BlogInputModel = {
        name: "MI OBRECHENI",
        description: "norm takoy blog",
        websiteUrl: "https://mi-obrecheni.herokuapp.com/",
    };
    //console.log(dataRepository.returnLength());



    // beforeAll(async () => {
    //     // console.log("Repository entries: ", dataRepository.returnLength());
    //
    //     const res = await request(testApp).delete(`${TESTING_PATH}/all-data/`);
    //     expect(dataRepository.returnLength()).toBe(0);
    //
    //     // console.log("Repository entries: ", dataRepository.returnLength());
    //     expect(res.status).toBe(HttpStatus.NoContent);
    // })

    it("GET '/api/blogs/' - should respond with a list of bloggers (2 entries total)", async() => {
        const res = await request(testApp).get(`${BLOGS_PATH}/`);

        const entriesCount = Object.keys(res.body).length;
        expect(entriesCount).toBe(2);

        expect(res.status).toBe(HttpStatus.Ok);
    });

    it("POST '/api/blogs/' - should add a blog to the repository", async() => {
        const res = await request(testApp).post(`${BLOGS_PATH}/`).send(correctBlogInput);
        expect(dataRepository.returnLength()).toBe(3);

        // console.log(res.body);
        const propertyCount = Object.keys(res.body).length;
        expect(propertyCount).toBe(4);

        expect(res.body.id).toBeDefined();
        expect(typeof res.body.id).toBe('string');
        expect(res.body).toHaveProperty('name', 'MI OBRECHENI');
        expect(res.body).toHaveProperty('description', 'norm takoy blog');
        expect(res.body).toHaveProperty('websiteUrl', 'https://mi-obrecheni.herokuapp.com/');

        expect(res.status).toBe(HttpStatus.Created);
    });

    it("GET '/api/blogs/{id}' - should respond with a BlogViewModel-formatted info about a requested blog", async() => {

        expect(dataRepository.returnLength()).toBe(3);

        const res = await request(testApp).get(`${BLOGS_PATH}/001`);

        const propertyCount = Object.keys(res.body).length;
        expect(propertyCount).toBe(4);

        expect(res.body).toHaveProperty('id', '001');
        expect(res.body).toHaveProperty('name', 'blogger_001');
        expect(res.body).toHaveProperty('description', 'takoy sebe blogger...');
        expect(res.body).toHaveProperty('websiteUrl', 'https://takoy.blogger.com');

        expect(res.status).toBe(HttpStatus.Ok);
    });

})