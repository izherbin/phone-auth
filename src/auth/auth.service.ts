import { HttpService } from '@nestjs/axios'
import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { catchError, lastValueFrom, map } from 'rxjs'
import { UserDTO } from './dto/user.dto'

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private http: HttpService
  ) {}

  testConfig(): string {
    const test = this.configService.get<string>('TEST')
    return test
  }

  async testHttp() {
    const request = this.http
      .get('https://catfact.ninja/fact')
      .pipe(map((res) => res.data?.fact))
      .pipe(
        catchError(() => {
          throw new ForbiddenException('API not available')
        })
      )
    const fact = await lastValueFrom(request)
    return fact
  }

  async postQuestionnary(user: UserDTO): Promise<HttpStatus> {
    if (!(await this.checkCaptcha(user))) {
      return HttpStatus.UNAUTHORIZED
    }

    if (!(await this.checkPhone(user))) {
      return HttpStatus.FORBIDDEN
    }

    return HttpStatus.OK
  }

  async checkCaptcha(user) {
    console.log('user:', user)
    return true
  }

  async checkPhone(user) {
    console.log('user:', user)
    return true
  }

  async getQuestionnary(user) {
    console.log('user:', user)
    return 'Ok'
  }
}
