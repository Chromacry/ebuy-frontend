import "./Home.scss";
import Navbar from "../../components/Navbar/Navbar";
import { useEffect } from "react";
import { loginApi } from "../../services/APIs/UserApi";

function Home() {
  useEffect(()=> {
    loginApi({
      email: '',
      password: 'abc'
    }).then((response) => {
      console.log(response)  
    }).catch((error) => console.log(error))
  },[])
  return (
 
      <div className="body"><Navbar />
        <section className="main">
        </section>
        <div className="wrapper">
        </div>
      </div>
  );
}

export default Home;
