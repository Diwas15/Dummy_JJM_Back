import React, { useEffect, useState } from 'react';
import html2canvas from 'html2canvas';
import logo from './images/org.png'

function QR() {
    const [data, setData] = useState(null);
    useEffect(()=>{
        fetch(`https://dummy-jjm-back.onrender.com/getQrData`,).then((res)=>res.json().then((data)=>{
            console.log(data);
            setData(data);
        })).catch((err)=>console.log(err));
    },[]);

    function downloadURI(uri, name) {
        console.log("click")
        var link = document.createElement("a");
        link.download = name;
        link.href = uri;
        link.click();
        // clearDynamicLink(link); 
    }
    
    //Your modified code.
    function printToFile(div) {
        html2canvas(div,{
            allowTaint:true,
            useCORS:true,
            ignoreElements:(element)=>{
                if(element.classList.contains('qr_download_btn'))   return true;
            }
        }).then(canvas=>{
            var myImage = canvas.toDataURL("image/png");
            downloadURI(myImage,div.getAttribute('myAttribute'));
        })
    }
  return (
    <div className='qr_container'>
        <header className='form_header' style={{width:'100%',margin:0}}><img src={logo} alt="" /><h2 style={{margin:'auto'}}>Jal Jeevan Mission Schemes QR (Uttarakhand)</h2></header>
        <hr className='rule' style={{  borderColor:'#184b9e2d'}} />
      {
        data &&
        data.map((value,key)=>{
            return<>
                <div className='qr_data' id={`${key}`}  myAttribute={value.Name}>
                    
                    <img src={`data:image;base64,${value.data}`} alt=""/>
                    <div className="qr_text">
                        <button style={{height:'2rem',fontSize:'12px', fontWeight:'600'}} className='qr_download_btn' onClick={()=>printToFile(document.getElementById(`${key}`))}>Download</button>
                        <h2>Scheme ID : {value.schemeID}</h2>
                        <h2>Scheme Name : {value.Name}</h2>
                    </div>
                    
                </div>
            </>
        })
      }
    </div>
  )
}

export default QR
