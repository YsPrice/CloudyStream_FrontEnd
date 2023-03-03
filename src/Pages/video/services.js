import axios from "axios";



   export const saveVideo = async (videoId) => {
       try{
           const res =  axios.put(`users/save/${videoId}`)
      return await res;
       } catch(err){
           console.log(err)
       }
    };

   export const fetchVideo = async (videoId) => {
try{
    const res = axios.get(`/videos/find/${videoId}`);
     return await res;

   } catch(err){
       console.log(err)
   }
};

  export const fetchSearch = async (query) => {
try{
    const res = axios.get(`/videos/search${query}`);
   return await res;
  
} catch(err){
    console.log(err)
}
  };
 
  export const fetchRandom = async () => {
      try {
    const res = axios.get(`videos/random`);
    return await res;
  
  }catch(err){
      console.log(err)
  }
}
