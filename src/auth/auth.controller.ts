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
  async postQuestionnary(@Body() user: UserDTO) {
    const status = await this.authService.postQuestionnary(user)
    if (status === HttpStatus.UNAUTHORIZED) {
      throw new HttpException('Unsuccessful captcha', HttpStatus.UNAUTHORIZED)
    } else if (status === HttpStatus.FORBIDDEN) {
      throw new HttpException('Bad phone number', HttpStatus.FORBIDDEN)
    } else {
      return 'Questionnary successfully sent'
    }
  }
}
