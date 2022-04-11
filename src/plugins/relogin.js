
import {getUserInfo} from '@/network/profile.js'

export function relogin(){
  getUserInfo().then(res=>{
    console.log(res.data.data);
    const result = res.data.data
    console.log('relogin');
    console.log(result);
    return result
  })
}