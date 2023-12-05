import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { QuestionnaryModule } from './questionnary/questionnary.module'

@Module({
  imports: [AuthModule, QuestionnaryModule],
  controllers: [],
  providers: []
})
export class AppModule {}
