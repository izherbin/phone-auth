import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { QuestionnaryController } from './questionnary.controller'
import { QuestionnaryService } from './questionnary.service'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [ConfigModule.forRoot(), HttpModule],
  controllers: [QuestionnaryController],
  providers: [QuestionnaryService]
})
export class QuestionnaryModule {}
