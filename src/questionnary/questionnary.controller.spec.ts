import { Test, TestingModule } from '@nestjs/testing'
import { QuestionnaryController } from './questionnary.controller'

describe('QuestionnaryController', () => {
  let controller: QuestionnaryController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionnaryController]
    }).compile()

    controller = module.get<QuestionnaryController>(QuestionnaryController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
