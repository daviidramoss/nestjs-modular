import { Global, Module } from "@nestjs/common";

const API_KEY = "esteEsunApiKEY";
const API_KEY_PROD = "esteEsunApiKEY pero deProd";

@Global()
@Module({
  providers: [ {
    provide: 'API_KEY',
    useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
  }],
  exports: ['API_KEY']
})
export class DatabaseModule {}
