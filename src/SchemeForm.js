import React, { useContext, useEffect, useState } from 'react';
import './Styles/Form.css';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import {useNavigate} from 'react-router-dom';
import org from './images/org.png';
function SchemeForm() {
  const [list, setList] = useState([{Component:'',Specification:''}]);
  const [newKey, setNewKey] = useState('');
  const [one, setOne] = useState([]);
  const [two,setTwo] = useState([]);
  const [three, setThree] = useState([]);
  const [showClass, setShowClass] = useState("");
  const [parent, setParent] = useState("");
  const [file, setFile] = useState('');
  const [url, setUrl] = useState('');
  const [link, setLink] = useState('');
  const [links,setLinks] = useState([]);

  const navigate = useNavigate();

  let initialValues = {
    Basic_Details:{
      Name:"",
      "Scheme ID":'',
      Division:"",
      District:'',
      Block:'',
      Panchayat:'',
      Village:'',
      Habitation:''
    },
    Scheme_Details:{
      "DWSM Approved Date":'',
      "No of FHTC":'',
      "Total Cost":'',
      "State Share":'',
      "Center Share":'',
      "Handed Over on (Date)":'',
      "Work Order Date":'',
      "Cost of Work Order":'',
      "Completion Date of Scheme":'',
      "Final Cost of Scheme (Payment)":'',
      "Contracter Name":'',
      "Contracter Address":'',

    },

    Field_Functionary:{
      "About Jal Mitra/PTC":{
        Name:'',
        "Phone No":'',
      },
      "About VWSC":{
        President:{
          Name:'',
          "Phone No":''
        },
        Secretary:{
          Name:'',
          "Phone No":''
        }
      },
      "About Division Office":{
        EE:{
          Name:'',
          "Phone No":''
        },
        AE:{
          Name:'',
          "Phone No":'',
        },
        JE:{
          Name:'',
          "Phone No":''
        }
      }
    },
    Water_Quality:{
      "Date of Testing":'',
      PH:'',
      TDS:'',
      Iron:'',
      Turbidity:'',
      Florid:'',
      "Residual Chlorine":'',
      Chloride:'',
      Nitrate:'',
      "Bacteriological Test":''
    },

    Scheme_Component:list,
    
    Scheme_Layout:{
      PDF:'',
      Link:'',
    },
    Grievance_Contact:{
      Whatsapp:'',
      Phone:'',
      Email:''
    },
    Video_Links:links
  }


  // useEffect(()=>{
  //   fetch('http://192.168.29.100:8080/verifyToken',{
  //     method:"GET",
  //     headers:{
  //       Authentication:context.token
  //     }
  //   }).then((res)=>console.log(res)).catch((err)=>{
  //     console.log(err);
  //   })
  // },[context.authToken]);



  
  const addComponent = (key="")=>{
    
    if(parent == "Scheme Component"){
      console.log("hola");
      setList([...list,{Component:'',Specification:''}]);
    }
    else if(parent == "Basic Details"){
      let temp = one;
      temp.push(key);
      setOne([...temp])
    }
    else if(parent == "scheme details"){

      let temp = two;
      temp.push(key);
      setTwo([...temp]);
    }
    else if(parent == "Water Quality"){
      let temp = three;
      temp.push(key);
      setThree([...temp]);
    }
  }
  const removeComponent = ()=>{
    if(parent == 'scheme component'){
      let temp = list;
      temp.pop();
      setList([...temp]);
    }
    else if(parent == "Basic Details"){
      let temp = one;
      temp.pop();
      setOne([...temp]);

    }
    else if(parent == "scheme details"){
      let temp = two;
      temp.pop();
      setTwo([...temp]);
    }
    
  }


  const blobToBase64 = (file)=>{
    
    var reader = new FileReader();
    reader.readAsDataURL(file); 
    reader.onload = function() {
      var base64data = reader.result;      
      setUrl((prev)=>String(base64data)); 
      console.log(base64data);
    }
  }

  const handleSubmit = (values,{resetForm})=>{
    
      // console.log(url)
      values.Video_Links = links;
      values.Scheme_Layout.PDF = url;
      console.log(values);
      fetch(`https://dummy-jjm-back.onrender.com/addScheme`,{
      method:'POST',
      body:JSON.stringify(values),
      headers:{
        "Content-Type":"application/json"
      }
    }).then((res)=>{
      
      console.log(res)
      if(res.status == 400)
        window.alert("scheme already exists");
      else if(res.status == 201){
        window.alert("scheme uploaded successfully");
        resetForm();
        setFile('');
        setLinks([]);
        setList([])
      }
      else if(res.status == 401)
        window.alert("scheme could not be uploaded. Please try again or login again");

    }).catch((err)=>console.log(err));
  }


  return (
    <div className='schemeForm'>
        <header className='form_header' style={{width:'100%'}}>
          <img src={org} alt="Uttarakhnd Sarkar" />
          <button onClick={()=>{
            // let link = document.createElement('a');
            // link.href = 'http://192.168.29.100/schemesQR';
            // link.click();
            navigate('/qrs');
          }} >Get QR</button>
        </header>
        <div className={`pop_up ${showClass}`}>
          <button onClick={()=>setShowClass("")} style={{position:'absolute',top:'0', right:'0',margin:'.5rem',padding:'5px', backgroundColor:'red',color:'white'}}>close</button>
          <input type="text" placeholder='Field Name' onChange={(e)=>setNewKey(e.target.value)}/>
          <button style={{padding:'5px', margin:'.5rem'}} onClick={()=>{
            addComponent(newKey);
            setShowClass("");
          }} >Save</button>
        </div>
        <div className="form_box">
          <h2>Scheme Details Entry Form</h2>
          <Formik initialValues={initialValues} onSubmit={(values,{resetForm})=>
            handleSubmit(values,{resetForm})
          }>
            <Form>
              <div className="section">
                <h2>Basic Details</h2>
                <hr />
                <div className="section_box">
                  <div className="input_box">
                    <label htmlFor="Name">Name</label>
                    <Field  className='input' type='text' name='Basic_Details.Name'  />
                  </div>
                  <div className="input_box">
                    <label htmlFor="Name">Scheme ID</label>
                    <Field  className='input' type='text' name='Basic_Details.Scheme ID'  />
                  </div>
                  <div className="input_box">
                    <label htmlFor="Name">Division</label>
                    <Field  className='input' type='text' name='Basic_Details.Division'  />
                  </div>
                  <div className="input_box">
                    <label htmlFor="Name">District</label>
                    <Field  className='input' type='text' name='Basic_Details.District'  />
                  </div>
                  <div className="input_box">
                    <label htmlFor="Name">Block</label>
                    <Field  className='input' type='text' name='Basic_Details.Block'  />
                  </div>
                  <div className="input_box">
                    <label htmlFor="Name">Panchayat</label>
                    <Field  className='input' type='text' name='Basic_Details.Panchayat'/>
                  </div>
                  <div className="input_box">
                    <label htmlFor="Name">Village</label>
                    <Field  className='input' type='text' name='Basic_Details.Village'/>
                  </div>
                  <div className="input_box">
                    <label htmlFor="Name">Habitation</label>
                    <Field  className='input' type='text' name='Basic_Details.Habitation'/>
                  </div>
                  {
                    one.map((value)=>{
                      return  <div className="input_box">
                                <label htmlFor="Name">{value}</label>
                                <Field  className='input' type='text' name={`Basic_Details.${value}`}/>
                              </div>
                    })
                  }
                </div>  
                <div style={{display:'flex', justifyContent:'left'}}>
                  <button type='button' onClick={()=>{setShowClass('show'); setParent("Basic Details")}}>Add More</button>
                  <button type='button' style={{backgroundColor:'red'}} onClick={()=>{ setParent("Basic Details");removeComponent();}}>Delete</button>
                </div>
              </div>
              <div className="section">
                <h2>Scheme Details</h2>
                <hr />
                <br />
                <h3>A. About the Scheme</h3>
                <div className="section_box">
                  <div className="input_box">
                    <label htmlFor="Name">DWSM Approved Date</label>
                    <Field  className='input' type='text' name='Scheme_Details.DWSM Approved Date'/>
                  </div>
                  <div className="input_box">
                    <label htmlFor="Name">No.of FHTC</label>
                    <Field  className='input' type='text' name='Scheme_Details.No of FHTC'/>
                  </div>
                  <div className="input_box">
                    <label htmlFor="Name">Total Cost</label>
                    <Field  className='input' type='text' name='Scheme_Details.Total Cost'/>
                  </div>
                  <div className="input_box">
                    <label htmlFor="Name">State Share</label>
                    <Field  className='input' type='text' name='Scheme_Details.State Share'/>
                  </div>
                  <div className="input_box">
                    <label htmlFor="Name">Center Share</label>
                    <Field  className='input' type='text' name='Scheme_Details.Center Share'/>
                  </div>
                  <div className="input_box">
                    <label htmlFor="Name">Handed Over On (Date)</label>
                    <Field  className='input' type='text' name='Scheme_Details.Handed Over on (Date)'/>
                  </div>
                  <div className="input_box">
                    <label htmlFor="Name">Work Order Date</label>
                    <Field  className='input' type='text' name='Scheme_Details.Work Order Date'/>
                  </div>
                  <div className="input_box">
                    <label htmlFor="Name">Cost of Work Order</label>
                    <Field  className='input' type='text' name='Scheme_Details.Cost of Work Order'/>
                  </div>
                  <div className="input_box">
                    <label htmlFor="Name">Completion Date Of Scheme</label>
                    <Field  className='input' type='text' name='Scheme_Details.Completion Date'/>
                  </div>
                  <div className="input_box">
                    <label htmlFor="Name">Final Cost Of Scheme (Payment)</label>
                    <Field  className='input' type='text' name='Scheme_Details.Final Cost of Scheme (Payment)'/>
                  </div>
                  <div className="input_box">
                    <label htmlFor="Name">Contracter Name</label>
                    <Field  className='input' type='text' name='Scheme_Details.Contracter Name'/>
                  </div>
                  <div className="input_box">
                    <label htmlFor="Name">Contracter Address</label>
                    <Field  className='input' type='text' name='Scheme_Details.Contracter Address'/>
                  </div>
                  {
                    two.map((value)=>{
                      return  <div className="input_box">
                                <label htmlFor="Name">{value}</label>
                                <Field  className='input' type='text' name={`Scheme_Details.${value}`}/>
                              </div>
                    })
                  }
                </div>  
                <div style={{display:'flex', justifyContent:'left'}}>
                  <button type='button' onClick={()=>{setShowClass('show'); setParent("scheme details")}}>Add More</button>
                  <button type='button' style={{backgroundColor:'red'}} onClick={()=>{setParent("scheme details");removeComponent();}}>Delete</button>
                </div>
              </div>
              <div className="section">
                <h2>Field  Functionary</h2>
                <hr />
                <br />
                <h3>A. About Jal Mitra/ PTC</h3>
                <div className="section_box">
                  <div className="input_box">
                    <label htmlFor="Name">Name</label>
                    <Field  className='input' type='text' name='Field_Functionary.About Jal Mitra/PTC.Name'/>
                  </div>
                  <div className="input_box">
                    <label htmlFor="Name">Phone No.</label>
                    <Field  className='input' type='text' name='Field_Functionary.About Jal Mitra/PTC.Phone No'/>
                  </div>
                </div>  
                <h3>B. About VWSC</h3>
                <div className="section_box">
                  <div className="input_box">
                    <label htmlFor="Name">VWSC Name</label>
                    <Field  className='input' type='text' name='Field_Functionary.About VWSC.Name'/>
                  </div>
                  <div className="input_box">
                    <label htmlFor="Name">President Name</label>
                    <Field  className='input' type='text' name='Field_Functionary.About VWSC.President.Name'/>
                  </div>
                  <div className="input_box">
                    <label htmlFor="Name">Mobile No</label>
                    <Field  className='input' type='text' name='Field_Functionary.About VWSC.President.Phone No'/>
                  </div>
                  <div className="input_box">
                    <label htmlFor="Name">Secretary Name</label>
                    <Field  className='input' type='text' name='Field_Functionary.About VWSC.Secretary.Name'/>
                  </div>
                  <div className="input_box">
                    <label htmlFor="Name">Mobile No</label>
                    <Field  className='input' type='text' name='Field_Functionary.About VWSC.Secretary.Phone No'/>
                  </div>
                </div>
                <h3>C. About Division Office</h3>
                <div className="section_box">
                  <div className="input_box">
                    <label htmlFor="Name">EE Name</label>
                    <Field  className='input' type='text' name='Field_Functionary.About Division Office.EE.Name'/>
                  </div>
                  <div className="input_box">
                    <label htmlFor="Name">Phone No.</label>
                    <Field  className='input' type='text' name='Field_Functionary.About Division Office.EE.Phone No'/>
                  </div>
                  <div className="input_box">
                    <label htmlFor="Name">AE Name</label>
                    <Field  className='input' type='text' name='Field_Functionary.About Division Office.AE.Name'/>
                  </div>
                  <div className="input_box">
                    <label htmlFor="Name">Phone No.</label>
                    <Field  className='input' type='text' name='Field_Functionary.About Division Office.AE.Phone No'/>
                  </div>
                  <div className="input_box">
                    <label htmlFor="Name">JE Name</label>
                    <Field  className='input' type='text' name='Field_Functionary.About Division Office.JE.Name'/>
                  </div>
                  <div className="input_box">
                    <label htmlFor="Name">Phone No.</label>
                    <Field  className='input' type='text' name='Field_Functionary.About Division Office.JE.Phone No'/>
                  </div>
                </div>

              </div>
              <div className="section">
                <h2>Water Quality</h2>
                <hr />
                <div className="section_box">
                  <div className="input_box">
                    <label htmlFor="Name">Date of Testing</label>
                    <Field  className='input' type='text' name='Water_Quality.Date of Testing'/>
                  </div>
                  <div className="input_box">
                    <label htmlFor="Name">PH</label>
                    <Field  className='input' type='text' name='Water_Quality.PH'/>
                  </div>
                  <div className="input_box">
                    <label htmlFor="Name">TDS</label>
                    <Field  className='input' type='text' name='Water_Quality.TDS'/>
                  </div>
                  <div className="input_box">
                    <label htmlFor="Name">Iron</label>
                    <Field  className='input' type='text' name='Water_Quality.Iron'/>
                  </div>
                  <div className="input_box">
                    <label htmlFor="Name">Turbidity</label>
                    <Field  className='input' type='text' name='Water_Quality.Turbidity'/>
                  </div>
                  <div className="input_box">
                    <label htmlFor="Name">Florid</label>
                    <Field  className='input' type='text' name='Water_Quality.Florid'/>
                  </div>
                  <div className="input_box">
                    <label htmlFor="Name">Residual Chlorine</label>
                    <Field  className='input' type='text' name='Water_Quality.Residual Chlorine'/>
                  </div>
                  <div className="input_box">
                    <label htmlFor="Name">Chloride</label>
                    <Field  className='input' type='text' name='Water_Quality.Chloride'/>
                  </div>
                  <div className="input_box">
                    <label htmlFor="Name">Nitrate</label>
                    <Field  className='input' type='text' name='Water_Quality.Nitrate'/>
                  </div>
                  <div className="input_box">
                    <label htmlFor="Name">Bacteriological Test</label>
                    <Field  className='input' type='text' name='Water_Quality.Bacteriological Test'/>
                  </div>
                  {
                    three.map((value)=>{
                      return  <div className="input_box">
                                <label htmlFor="Name">{value}</label>
                                <Field  className='input' type='text' name={`Water_Quality.${value}`}/>
                              </div>
                    })
                  }
                </div>  
                <div style={{display:'flex', justifyContent:'left'}}>
                  <button type='button' onClick={()=>{setShowClass('show'); setParent("Water Quality")}}>Add More</button>
                  <button type='button' style={{backgroundColor:'red'}} onClick={()=>{ setParent("Water Quality");removeComponent();}}>Delete</button>
                </div>
              </div>
              <div className="section">
                <h2>Scheme Component</h2>
                <hr />
                <div className="section_box">
                  
                  {
                    list.map((obj,index)=>{
                      return <>
                    <div className="input_box">
                    <label htmlFor="Name">Component Name</label>
                    <Field  className='input' type='text' name={`Scheme_Component[${index}].Component`}/>
                  </div>
                  <div className="input_box">
                    <label htmlFor="Name">Specification</label>
                    <Field  className='input' type='text' name={`Scheme_Component[${index}].Specification`}/>
                  </div></>
                    })
                  }
                </div>  
                <div style={{display:'flex', justifyContent:'left'}}>
                  <button type='button' onClick={()=>{setParent("Scheme Component");addComponent();}}>Add More</button>
                  <button type='button' style={{backgroundColor:'red'}} onClick={()=>{setParent("Scheme Component");removeComponent();}}>Delete</button>
                </div>
              </div>
              <div className="section">
                <h2>Scheme Layout</h2>
                <hr />
                <br />
                <h3>A. GIS Mapping (PDF FORMAT)</h3>
                <div className="section_box">
                  <div className="input_box">
                    <label htmlFor="">PDF</label>
                    <label style={{display:'flex', alignItems:'center',justifyContent:'space-between', border:'1px solid gray', borderRadius:'.5rem', padding:'.7rem'}} htmlFor="file"><h5 style={{ padding:'5px', borderRadius:'5px', boxShadow:'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px'}}>Choose File </h5><p style={{alignContent:'center', fontSize:'16px', marginLeft:'auto', maxWidth:'60%',height:'1.5rem',overflow:'hidden', textOverflow:'...'}}>{file? file.name:''}</p></label>
                    
                    <p>(** max file size is 10mb)</p>
                    <input style={{visibility:'hidden'}} className='input' id='file' type='file' accept='application/pdf' onChange={(e)=>{
                      if(e.target && e.target.files[0].size<10*1024*1024){
                        setFile(e.target.files[0]);
                        console.log(e.target.files[0])
                        blobToBase64(e.target.files[0])
                      }
                      
                    }} />
                    
                  </div>
                </div>
                <h3>B. GIS MAP Link</h3>
                <div className="section_box">
                  <div className="input_box">
                    <label htmlFor="Name">Link</label>
                    <Field  className='input' type='text' name='Scheme_Layout.Link'/>
                  </div>
                </div>
              </div>
              <div className="section">
                <h2>Grievance Contact</h2>
                  <hr />
                  <br />
                <div className="section_box">
                  <div className="input_box">
                    <label htmlFor="Name">Whatsapp Number</label>
                    <Field  className='input' type='tel' name='Grievance_Contact.Whatsapp' maxLength={10}/>
                  </div>
                  <div className="input_box">
                    <label htmlFor="Name">Phone Number</label>
                    <Field  className='input' type='tel' name='Grievance_Contact.Phone' maxLength={10}/>
                  </div>
                  <div className="input_box">
                    <label htmlFor="Name">Email</label>
                    <Field  className='input' type='email' name='Grievance_Contact.Email'/>
                  </div>
                </div>
              </div>
              <div className="section">
                <h2>Video Links (Youtube)</h2>
                  <hr />
                  <br />
                <div className="section_box">
                  
                  <div className="input_box">
                    <label htmlFor="Name">Links</label>
                    <Field  className='input' type='text' value={link} name='Video_Links' onKeyUp={(e)=>{
                      e.preventDefault();
                      if(e.key === ','){
                        let temp = link.slice(0,-1);
                        if(temp!="")
                          setLinks((prev)=>[...prev,temp]);
                        setLink('');
                        e.target.value = ''
                      }
                      
                    }} onChange={(e)=>{
                      if(e.key != ',')
                      setLink(e.target.value);
                    }}/>
                    <div>
                      {links.map((value,key)=>{
                        return <>
                          <p style={{fontSize:'15px', margin:'.5rem 0'}}>Link {key+1} : {value}</p>
                        </>
                      })}
                      <button type='button' style={{minWidth:'min-content', backgroundColor:'red', display:links.length==0?'none':'inline'}} onClick={()=>{
                        let temp = links;
                        temp.pop();
                        setLinks([...temp])
                      }}>delete</button>
                    </div>
                  </div>
                </div>
              </div>
              <button className='submit_btn' type='submit' onClick={(e)=>console.log(e.target.values)}> SUBMIT</button>
            </Form>
          </Formik>
        </div>
    </div>
  )
}

export default SchemeForm
