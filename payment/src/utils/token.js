import axios from 'axios';

export async function validateToken(token){
  let flag = false

  const request = {
    "token": token
  }
  const response = await axios.post('/api/validate/jwt',JSON.stringify(request) , {headers: {
      'Content-Type': 'application/json',
    }
  })
  .then((response) => {
    const resp = response.data
    if(resp.success == true){
      flag = true
    }
  })
  .catch((error) => {
    alert("Internal Server Error! Cannot Reach Server!")
  });

  return flag
  
}

export async function generateToken(name){
    const request = {
        "username": name
    }
    
    await axios.post('/api/generate/jwt',JSON.stringify(request) , {headers: {
        'Content-Type': 'application/json',
      }
    })
    .then((response) => {
      const resp = response.data

      if( resp.success == true){
        localStorage.setItem('jwtToken', resp.result);
      }else{
      }
    })
    .catch((error) => {
      alert("Internal Server Error!")
    });
}