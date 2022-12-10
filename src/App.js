import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";
import { fetchImages } from "./api";
const headerStyle = {
  height:"120px",
  backgroundColor: 'rgba(0,204,255)'
};
function Loading() {
  return <p>Loading...</p>;
}

function Gallery(props) {
  const { urls } = props;
  var i = 1;
  var list = [];
  if (urls == null) {
    return <Loading />;
  }
  
  return (
    <div className="columns is-vcentered is-multiline">
      {urls.map((url) => {
        list.push(
          <div key={url} className="col-sm-4">
            <div  className='card'>
              <img src={url} className='img-thumbnail' width="100%" height="250" alt="サンプル画像" align="top" />
            </div>
          </div>
        );
        if(i == 3){
          var lists = list;
          list = [];
          i=1;
          return <div key={url} className='row m-5'>{lists}</div>;
        }
        i++
      })}
    </div>
  );
}
function App() {
  const [urls, setUrls] = useState(null);
  var list = [];
  useEffect(() => {
    for (let i = 0; i <30; i++) {
      
    
      fetchImages("shiba").then((urls) => {
        list.push(urls)
        console.log(list.length);
        if(list.length ==29){
          urls = list
          setUrls(urls);
        }
      });
    }
  }, []);
  return (
    <div className='App'>
      <div className='full-page'>
        <h1 className = "d-flex align-items-center text-white " style = {headerStyle}>
          <div className = "bg-clear text-white " style = {{paddingLeft:"40px"}}>

          <img src={`${process.env.PUBLIC_URL}/nekoicon.png`} className='img-thumbnail' width="10%" height="100%" alt="サンプル画像" align="top" style={{backgroundColor: `rgba(0,204,255)`,border:"none"}} />
            Cute Cat Gallery
          </div>
        </h1>
        
        <button onClick={() => window.location.reload()} type="button" className="btn btn-primary position-absolute top-0 end-0 m-5" >Refresh</button>
        
        <Gallery urls={urls} />
      </div>  
    </div>
  );
}

export default App;
