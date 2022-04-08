import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    NotFoundException,
    Param,
    Post,
    Put,
    Query,
    Res
} from '@nestjs/common';
import {BlogService} from "./blog.service";
import {CreatePostDto} from "./dto/create-post.dto";
import {ValidateObjectId} from "./shared/validate-object-id.pipes";

@Controller('blog')
export class BlogController {
    constructor(private blogService: BlogService) {}

    @Get('posts')
    async getPosts(@Res() res) {
        const posts = await this.blogService.getPosts()
        return res.status(HttpStatus.OK).json(posts)
    }

    @Get('post/:postId')
    async getPost(@Res() res, @Param('postId', new ValidateObjectId()) postId) {
        const post = await this.blogService.getPost(postId)
        if (!post) throw new NotFoundException('Post does not exist.')
        return res.status(HttpStatus.OK).json(post)
    }

    @Post('post')
    async addPost(@Res() res, @Body() createPostDto: CreatePostDto) {
        const newPost = await this.blogService.addPost(createPostDto)
        return res.status(HttpStatus.OK).json({
            message: 'Post has been submitted successfully',
            post: newPost
        })
    }

    @Put('edit')
    async editPost(
        @Res() res,
        @Query('postId', new ValidateObjectId()) postId,
        @Body() createPostDto: CreatePostDto
    ) {
        const editedPost = await this.blogService.editPost(postId, createPostDto)
        if (!editedPost) throw new NotFoundException('Post does not exist.')
        return res.status(HttpStatus.OK).json({
            message: 'Post has been successfully updated',
            post: editedPost
        })
    }

    @Delete('delete')
    async deletePost(@Res() res, @Query('postId', new ValidateObjectId()) postId) {
        const deletedPost = await this.blogService.deletePost(postId)
        if (!deletedPost) throw new NotFoundException('Post does not exist.')
        return res.status(HttpStatus.OK).json({
            message: 'Post has been deleted',
            post: deletedPost
        })
    }
}
