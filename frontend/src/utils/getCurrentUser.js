const getCurrentUser = () => {
  // console.log(getCurrentUser());
  try{
   
    return JSON.parse(localStorage.getItem("currentUser"));
  }catch(err){
     console.error("failed to parse current user" , err);
       return null
  }
  }
  
  export default getCurrentUser;