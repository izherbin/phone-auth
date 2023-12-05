import { HttpService } from '@nestjs/axios'
import { ForbiddenException, Injectable } from '@nestjs/common'
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

  async checkCaptcha(user: UserDTO): Promise<boolean> {
    console.log('user:', user)
    const request = this.http
      .get('https://smartcaptcha.yandexcloud.net/validate', {
        params: {
          secret: this.configService.get<string>('SMARTCAPTCHA_SERVER_KEY'),
          token: user.token
        }
      })
      .pipe(map((res) => res.status))

    const status = await lastValueFrom(request)
    if (status !== 200) {
      return false
    } else {
      return true
    }
  }

  async checkPhone(user: UserDTO): Promise<boolean> {
    const request = this.http
      .post(
        'https://api.devino.online/sms/messages',
        {
          data: {
            from: this.configService.get<string>('DEVINO_SENDERS_NAME'),
            to: user.phone.replace(/[)(+-]/g, ''),
            text: ''
          }
        },
        {
          headers: {
            Authorization:
              'Key ' + this.configService.get<string>('DEVINO_API_KEY')
          }
        }
      )
      .pipe(map((res) => res.data?.code))

    const status = await lastValueFrom(request)
    if (status !== 'OK') {
      return false
    } else {
      return true
    }
  }
}
