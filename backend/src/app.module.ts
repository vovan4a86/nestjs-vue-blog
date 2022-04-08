import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import { BlogModule } from './blog/blog.module';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/blog_db', {
    useNewUrlParser: true
  }), BlogModule, AuthModule, UsersModule],
  providers: [UsersService],
  controllers: [AppController],
})
export class AppModule {}
