export class QuestionnaryDTO {
  result: {
    number: number
    phone: string
    name: string
    birthday: string
    children: [
      {
        id: string
        name: string
        birthday: string
        fullName: string
        age: string
      }
    ]
    dateAccess: string
    isPromo: boolean
  }
  status: string
  errorMessage: string
}
