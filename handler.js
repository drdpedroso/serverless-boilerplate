import fetch from 'node-fetch'
import {distanceInWords} from 'date-fns'

const mapItemsToNotionCard = (items = []) => {
  return items.map(item => ({
    title: item.title,
    author: item.author,
    date: distanceInWords(new Date(), new Date(item.published)),
    url: item.originId
  }))
};

const getItems = async (event, context, callback) => {
  const getItemsUrl = 'https://cloud.feedly.com/v3/streams/contents?streamId=user%2F5f978fd3-1090-432c-bdd9-fec8395289c4%2Fcategory%2F2e702d82-a087-43fe-8694-d9598b01b104&count=40&unreadOnly=true&ranked=newest&similar=true&ck=1563208717329&ct=feedly.desktop&cv=31.0.405s';
  const token = 'AxKS9tlc3li7-RNX9KjONhkZpkkJfrPb8tAHmcZ8Qg4vP6DFpw_EaM1c2Lgwknf2URRCR30VNp3mcOuVt0yPQJ4gxcXxOotFdATLAmq1ubOoqr5PZPEN_1nhuSZH4Jn-uFqd6tK2VcvlIG9t-LsStqF7tBsdeEW0DICYIC9fN2NX2hiR7_WPPVPC9NzskwYD7Vd5ks9tGV6KPfYBLpdjgUkyOAw58eutbV7gRMX3xOTxAfdBJ1JS1_xs-2K4dw:feedlydev'
  const res = await fetch(getItemsUrl, {
    method: 'get',
    headers: { 'Authorization': `Bearer ${token}` },
  })
  const jsonRes = await res.json()
  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*', // Required for CORS support to work
    },
    body: JSON.stringify(mapItemsToNotionCard(jsonRes.items)),
  };

  return response
};

export { getItems }