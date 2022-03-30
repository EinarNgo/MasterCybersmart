import { Auth } from 'aws-amplify';

export default async function FinishTask() {
  try {
    const user = await Auth.currentAuthenticatedUser();
    const antallRiktig = user.attributes['custom:AntallRiktig']

    if (antallRiktig == undefined) {
        const setZero = await Auth.updateUserAttributes(user, {
            'custom:AntallRiktig':  "1"
        });
    } else {
        const utregning = parseInt(antallRiktig) + 1
        console.log('attributes:', utregning);
        const result = await Auth.updateUserAttributes(user, {
        'custom:AntallRiktig':  utregning.toString()
        });
    }
    
  } catch (err) {
    console.log('error fetching user info: ', err);
  }
}