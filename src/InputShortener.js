import React, { useState, useRef } from 'react';
import axios from 'axios';
//import { useHistory } from 'react-router-dom';

const InputShortener = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortlUrl, setShortUrl] = useState('');
  const errRef = useRef();
  const [errMsg, setErrMsg] = useState(null);
  const URL = 'http://localhost:8080/api/'
  const [showComponent, setShowComponent] = useState(false);






  const handleClick = () => {
    setShowComponent(!showComponent);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (originalUrl.length < 16) {
        setErrMsg("Please Enter valid Url")
        return false;
      }

      await axios.post(URL+'generate', { originalUrl })
        .then((response) => {
          console.log(response.data.shortLink);
          setShortUrl(response.data.shortLink);
        })
        setOriginalUrl('');

    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
        return false;
      } else if (err.response?.status === 204) {
        setErrMsg('Invalid Url');
        return false;
      } else {
        setErrMsg('URL Not Genrated ')
        return false;
      }
      errRef.current.focus();

    }
  }
  function MyComponent() {
    return <h3> http://localhost:8080/api/{shortlUrl} </h3>;
  }
  return (
    <div className="inputContainer">
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
      <h1>URL <span>Shortener</span></h1>
      <form onSubmit={handleSubmit}>
        <input type="url" value={originalUrl} onChange={(e) => setOriginalUrl(e.target.value)} />
        <button type="submit" onClick={handleClick}>Submit</button>

        
      </form>
      <br></br>
      <label><h3>Your Short URL:    {showComponent && <MyComponent />}</h3></label>
    

    </div>
  )
}

export default InputShortener