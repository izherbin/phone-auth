import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { UserDTO } from './dto/user.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get()
  async test() {
    return await this.authService.testHttp()
  }

  @Post()
  async checkUser(@Body() user: UserDTO) {
    if (!(await this.authService.checkCaptcha(user))) {
      throw new HttpException('Unsuccessful captcha', HttpStatus.UNAUTHORIZED)
    } else if (!(await this.authService.checkPhone(user))) {
      throw new HttpException('Bad phone number', HttpStatus.FORBIDDEN)
    } else {
      return 'Questionnary successfully sent'
    }
  }
}
