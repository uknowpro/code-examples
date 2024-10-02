import { Injectable } from '@nestjs/common';

@Injectable()
export class HelloService {
  execute(): { message: string } {
    return ({ message: 'Hello API' });
  }
}
