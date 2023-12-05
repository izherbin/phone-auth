import { HttpService } from '@nestjs/axios'
import { ForbiddenException, Injectable } from '@nestjs/common'
import { QuestionnaryDTO } from '../auth/dto/questionnary.dto'
import { catchError, lastValueFrom, map } from 'rxjs'

@Injectable()
export class QuestionnaryService {
  constructor(private http: HttpService) {}

  async getQuestionnary(phone: string): Promise<QuestionnaryDTO> {
    const request = this.http
      .get('http://Anketa/' + phone)
      .pipe(map((res) => res.data?.result))
      .pipe(
        catchError(() => {
          throw new ForbiddenException("Couldn't GET /Anketa")
        })
      )
    const questionnary = await lastValueFrom(request)
    return questionnary
  }

  async postQuestionnary(questionnary: QuestionnaryDTO) {
    this.http.post('http://Anketa', questionnary).pipe(
      catchError(() => {
        throw new ForbiddenException("Couldn't PUT /Anketa")
      })
    )

    return 'Questionnary sent successfully'
  }
}
