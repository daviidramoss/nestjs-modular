import {  Module} from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './products/controllers/products.controller';
import { CategoriesController } from './products/controllers/categories.controller';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import {HttpModule, HttpService} from "@nestjs/axios";

const API_KEY = "esteEsunApiKEY";
const API_KEY_PROD = "esteEsunApiKEY pero deProd";

@Module({
  imports: [HttpModule, UsersModule, ProductsModule],
  controllers: [AppController, ProductsController, CategoriesController],
  providers: [AppService, {
    provide: 'API_KEY',
    useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
  },
    {
      provide: 'TASKS',
      useFactory: async  (http: HttpService) => {
        const request = http.get('https://jsonplaceholder.typicode.com/todos');
        const  tasks =  await lastValueFrom(request);
        return tasks.data;
      },
      inject: [HttpService],
    }],
})
export class AppModule {}

