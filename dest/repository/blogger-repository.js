"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataRepository = void 0;
const nonDisclosableDatabase = {
    bloggerRepository: [{
            bloggerInfo: {
                id: "001",
                name: "blogger_001",
                description: "takoy sebe blogger...",
                websiteUrl: "https://takoy.blogger.com",
            },
            bloggerPosts: [{
                    id: "001_001",
                    title: "post blog 001",
                    shortDescription: "post ni o 4em",
                    content: "Eto testovoe napolnenie posta 001_001",
                    blogId: "001",
                    blogName: "blogger_001"
                },
                {
                    id: "001_002",
                    title: "post blog 002",
                    shortDescription: "post ni o 4em",
                    content: "Eto testovoe napolnenie posta 001_002",
                    blogId: "001",
                    blogName: "blogger_001"
                }
            ]
        },
        {
            bloggerInfo: {
                id: "002",
                name: "blogger_002",
                description: "a eto klassnii blogger!",
                wbesiteUrl: "https://klassnii.blogger.com"
            },
            bloggerPosts: [{
                    id: "002_001",
                    title: "post blog 001",
                    shortDescription: "horowii post",
                    content: "Eto testovoe napolnenie posta 002_001",
                    blogId: "002",
                    blogName: "blogger_002"
                },
                {
                    postId: "002_002",
                    postTitle: "post blog 002",
                    postShortDescription: "horowii post",
                    postContent: "Eto testovoe napolnenie posta 002_002",
                    blogId: "002",
                    blogName: "blogger_002"
                }]
        }
    ]
};
const generateCombinedId = () => {
    const timestamp = Date.now();
    const random = Math.random().toString().substring(2, 5);
    return `${timestamp}-${random}`;
};
exports.dataRepository = {
    // методы для управления блогами
    findAllBlogs() {
        return nonDisclosableDatabase.bloggerRepository.map(({ bloggerInfo }) => ({
            id: bloggerInfo.id,
            name: bloggerInfo.name,
            description: bloggerInfo.description,
            websiteUrl: bloggerInfo.websiteUrl
        }));
    },
    createNewBlog(newBlog) {
        const newBlogEntry = Object.assign({ id: generateCombinedId() }, newBlog);
        const newDatabaseEntry = {
            bloggerInfo: newBlogEntry,
            bloggerPosts: []
        };
        nonDisclosableDatabase.bloggerRepository.push(newDatabaseEntry);
        return newBlogEntry;
    },
    findSingleBlog(id) {
        const blogger = nonDisclosableDatabase.bloggerRepository.find((blogger) => blogger.bloggerInfo.id === id);
        if (blogger) {
            const foundBlogger = {
                id: blogger.bloggerInfo.id,
                name: blogger.bloggerInfo.name,
                description: blogger.bloggerInfo.description,
                websiteUrl: blogger.bloggerInfo.websiteUrl
            };
            return foundBlogger;
        }
        return undefined;
    },
    updateBlog(id, newData) {
        const blogger = nonDisclosableDatabase.bloggerRepository.find((blogger) => blogger.bloggerInfo.id === id);
        if (blogger) {
            let blogIndex = nonDisclosableDatabase.bloggerRepository.indexOf(blogger);
            const updatedBlogger = Object.assign(Object.assign({}, blogger), { bloggerInfo: {
                    id: blogger.bloggerInfo.id,
                    name: newData.name,
                    description: newData.description,
                    websiteUrl: newData.websiteUrl
                } });
            nonDisclosableDatabase.bloggerRepository[blogIndex] = updatedBlogger;
            return null;
        }
        return undefined;
    },
    deleteBlog(id) {
        const blogger = nonDisclosableDatabase.bloggerRepository.find((blogger) => blogger.bloggerInfo.id === id);
        if (blogger) {
            let blogIndex = nonDisclosableDatabase.bloggerRepository.indexOf(blogger);
            nonDisclosableDatabase.bloggerRepository.splice(blogIndex, 1);
            return null;
        }
        return undefined;
    }
};
