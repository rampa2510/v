import interceptor from './Interceptor'

export async function error(){
  const addr = prompt("Error finding your location Please enter a benchmark or details of nearby surrounding");
  try {
    await interceptor('/emergency',"POST",{addr});
    alert("I have sent your location to the policemen. Help is on its way");

  } catch (err) {
    if(window.confirm("We encountered an issue while trying to connect please check your connection . Do you want to try again?")){
      error()
    }
  }
}

export async function getCoords(){
  // await getBotMsg('');

  if(!window.navigator.geolocation){
    await error()
  }else{
    navigator.geolocation.getCurrentPosition(success, error);
  }
}


export async function success({coords}) {
  try {
    const {display_name,boundingbox} = await fetch(`https://locationiq.org/v1/reverse.php?key=41866a1cdd99d0&lat=${coords.latitude}&lon=${coords.longitude}&format=json`).then(res=>res.json());
    // throw new Error("")
    await interceptor('emergency',"POST",{display_name,boundingbox});

  } catch (err) {
    error()
  }
} 
