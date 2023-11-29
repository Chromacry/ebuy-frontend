import "./Home.scss";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { loginApi } from "../../services/APIs/UserApi";
import banner from "../../assets/images/banner.png"
function Home() {
  const [typewriterText, setTypewriterText] = useState('');
  const typewriterPart = "ROJECT X"; // Part of the text for the typewriter effect
  const staticPart = "P"; // Static part of the text
  const typingSpeed = 100; // Speed of typing
  const typingPause = 1500; // Pause at the end before restarting
  const eraseSpeed = 50; // Speed of erasing
  const erasePause = 500; // Pause after erasing before typing again

  useEffect(() => {
    let index = 0;
    let isTyping = true;

    const typeWriter = () => {
      if (isTyping) {
        if (index < typewriterPart.length) {
          setTypewriterText(typewriterPart.substring(0, index + 1));
          index++;
          setTimeout(typeWriter, typingSpeed);
        } else {
          setTimeout(() => {
            isTyping = false;
            index = typewriterPart.length;
            typeWriter(); // Start erasing
          }, typingPause);
        }
      } else {
        if (index > 0) {
          setTypewriterText(typewriterPart.substring(0, index - 1));
          index--;
          setTimeout(typeWriter, eraseSpeed);
        } else {
          setTimeout(() => {
            isTyping = true;
            typeWriter(); // Start typing again
          }, erasePause);
        }
      }
    };

    typeWriter();

    return () => {
      setTypewriterText(''); // Cleanup if the component unmounts
    };
  }, []);
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
        <section className="heroSection">
          <div className="container">
            <div className="text">
            <h1>{staticPart}<span className="typewriter">{typewriterText}</span></h1>
            <div className="arrowBox">
       
            </div>
            <p>Discover Project X, Your One-Stop Shopping Haven! Explore our diverse range of products, from the newest tech wonders to stylish fashion and daily necessities. Enjoy a shopping experience where convenience, quality, and affordability meet. At Project X, we’re more than just a marketplace; we’re your partners in fulfilling every shopping need with ease and excellence. Join us now for an unparalleled shopping adventure, all in one place!</p>
            <button>Shop Now!</button>
          </div>
          <img src={banner} alt="" srcset="" />
          </div>
          
        </section>
        <div className="wrapper">
        </div>
      </div>
  );
}

export default Home;
