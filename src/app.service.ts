// import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getHello(): Promise<string> {
    const cacheKey = 'hello-message';

    try {
      const cached = await this.cacheManager.get<string>(cacheKey);
      if (cached) {
        this.logger.log(`📦 Cache hit for key: ${cacheKey}`);
        return `From Cache: ${cached}`;
      }

      const result = 'Hello World!';
      await this.cacheManager.set(cacheKey, result, 300);
      this.logger.log(`💾 Cache set for key: ${cacheKey}`);
      return `Newly Set: ${result}`;
    } catch (error) {
      this.logger.warn(
        `⚠️ Redis unavailable, fallback used. Reason: ${error.message}`,
      );
      return 'Hello World! (no cache)';
    }
  }

  // getHello(): string {
  //   return 'Hello World!';
  // }
}
