import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<string> {
    return await this.appService.getHello();
  }


  // status check
  @Get('health')
  healthCheck(): { status: string } {
    
    return { status: 'ok' };
  }
}
