import axios from "axios";    //  it is an js library file used to creat HTTP request to feteching the data 

const newRequest = axios.create({
  baseURL:"http://localhost:8080/",      // we use base url is an origin to fetch data where it gose and save 
  withCredentials: true,         // it use to send cookies with axios  along with request to the server
});

export default newRequest;