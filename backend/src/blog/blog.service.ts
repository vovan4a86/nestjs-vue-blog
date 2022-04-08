import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from 'mongoose'
import {Post} from "./interfaces/post.interface";
import {CreatePostDto} from "./dto/create-post.dto";

@Injectable()
export class BlogService {
    constructor(@InjectModel('Post') private readonly postModel: Model<Post>) {}

    async getPosts(): Promise<Post[]> {
        return await this.postModel
            .find()
            .exec()
    }

    async getPost(postId): Promise<Post> {
        return await this.postModel
            .findById(postId)
            .exec()
    }

    async addPost(createPostDto: CreatePostDto): Promise<Post> {
        const newPost = await new this.postModel(createPostDto)
        return newPost.save()
    }

    async editPost(postId, createPostDto: CreatePostDto): Promise<Post> {
        const editPost = await this.postModel.findByIdAndUpdate(postId, createPostDto, { new: true })
        return editPost
    }

    async deletePost(postId): Promise<any> {
        const deletedPost = await this.postModel.findByIdAndRemove(postId)
        return deletedPost
    }
}
