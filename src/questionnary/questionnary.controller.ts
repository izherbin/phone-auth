import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { QuestionnaryService } from './questionnary.service'
import { QuestionnaryDTO } from 'src/auth/dto/questionnary.dto'

@Controller('questionnary')
export class QuestionnaryController {
  constructor(private readonly questionnaryService: QuestionnaryService) {}

  @Get(':phone')
  async getQuestionnary(
    @Param('phone') phone: string
  ): Promise<QuestionnaryDTO> {
    return await this.questionnaryService.getQuestionnary(phone)
  }

  @Post()
  async postQuestionnary(
    @Body() questionnary: QuestionnaryDTO
  ): Promise<string> {
    return await this.questionnaryService.postQuestionnary(questionnary)
  }
}
