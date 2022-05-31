import { Auth } from 'aws-amplify';

//Hjelpefunksjon til å regnet ut poeng
export default async function PointCalculation(score) {
  try {
    const user = await Auth.currentAuthenticatedUser();
    const poeng = user.attributes['custom:Poeng']

    if (poeng == undefined) {
        const setZero = await Auth.updateUserAttributes(user, {
            'custom:Poeng':  score.toString()
        });
    } else {
        const utregning = parseInt(poeng) + score
        console.log('attributes:', utregning);
        const result = await Auth.updateUserAttributes(user, {
        'custom:Poeng':  utregning.toString()
        });
    }
    
  } catch (err) {
    console.log('error fetching user info: ', err);
  }
}
