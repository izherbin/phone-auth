import axios from 'axios'

async function getAxios() {
  const res = await axios
    .get('https://smartcaptcha.yandexcloud.net/validate', {
      params: {
        secret: 'ysc2_QT1hNpBKZUYu1MzE3bPB8dIvIaVU1IjbcCTDfH1A088fabda',
        token:
          'dD0xNzAyNjI0NTE3O2k9MTUxLjIzNi4xNS4xNjI7RD0wOTgyNDU5MkJEM0JFRDI0NEMwMDM0RTE3QTg4RDMzRDJGRTU1QUZFRjhEQUJENUYzQzkwQUVCMDAxMzgxQzI0QkRBMUNFMjkxN0I3OTQzQTUwOUU3MTY0MTkzNzRBMkU5MjQzRTQ1RENCOUEzRjFCRURENjYyN0Y3NjU4MTBFODkxREJFQTcwRUU4OTBBMDM5MzJGMTU3Mjt1PTE3MDI2MjQ1MTc2MDIyNjkyOTU7aD0wNGFlYWFkYTdjZWEwNzY1MjM0NGZiODI1YzQzNjU5MQ=='
      }
    })
    .catch((e) => {
      console.log('Error: ', e.message)
    })
  console.log('res:', res)
  console.log('All done!')
}

getAxios()
