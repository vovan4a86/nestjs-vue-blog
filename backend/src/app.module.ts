import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import { BlogService } from './blog/blog.service';
import { BlogController } from './blog/blog.controller';
import { BlogModule } from './blog/blog.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/blog_db', {
    useNewUrlParser: true
  }), BlogModule],
  // controllers: [BlogController],
  // providers: [BlogService],
})
export class AppModule {}
