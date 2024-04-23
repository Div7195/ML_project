import AddCircleIcon from '@mui/icons-material/AddCircle';
import { FormControl } from "@mui/material";
import ImageIcon from '@mui/icons-material/Image';
import DrawIcon from '@mui/icons-material/Draw';
import Canvas from './Canvas';
import { useState, useEffect } from 'react';
const Home = () => {
    const [imageFile, setImageFile] = useState(null)
    const [inputImgSource, setInputSource] = useState(null)
    const [outputImgSource, setOutputSource] = useState('')
    const [modeChosen, setMode] = useState('choose')
    const [loading, setLoading] = useState(false)
    const [drawnSketch, setInputSktech] = useState(null)
    const invokeModelApi = async() => {
        const data = new FormData();
        let type = '';
        if(imageFile){
                data.append("name", imageFile.name);
                data.append("file", imageFile);
                console.log(imageFile)
                type = 'select';
        }else{
                data.append("name", drawnSketch.name);
                data.append("file", drawnSketch);
                console.log(drawnSketch)
                type = 'draw';
        }
              
              const settings = {
                  method: "POST",
                  body: data,
                  }
                  try {
                    console.log('new imag')
                      setLoading(true)
                      setOutputSource('')
                      const fetchResponse = await fetch(``, settings);
                      const response = await fetchResponse.json();
                      setOutputSource(response.imageUrl)
                      setLoading(false)
                      console.log(response)
                  } catch (e) {
                      return e;
                  }
    }
    
    useEffect(() => {
        const displayInputImage = async() => {
          
          if(imageFile){
                  try {
                    setInputSource(URL.createObjectURL(imageFile));
                  } catch (e) {
                      return e;
                  }
          }else{
            setInputSource(null);
          }
        }
        displayInputImage();
      }, [imageFile])
      
      
    return(
        <>
            <div style={{
                display:'flex',
                flexDirection:'column',
                alignItems:'center',
            }}>
                
                <div className='header'>
                <div className='title'>
                    Face Sketch To Realistic Image Conversion Using GAN
                </div>
                </div>
                        <FormControl>
                        <div className='choose-button' onClick={() => {setMode('choose'); setInputSktech(null)}}>
                       
                                <label htmlFor="fileInput" style={{
                                    cursor:'pointer',
                                    fontWeight:700
                                }}>
                                <AddCircleIcon style={{
                                fontSize:"40px",
                                
                              }}/>  Choose a sketch image
                                </label>

                                <input type="file"
                                id="fileInput"
                                style={{
                                    display:'none'
                                }}
                                onChange={(e) => {
                                    setImageFile(e.target.files[0]); 
                                }
                                    }
                                >
                                </input>
                                </div>
                        </FormControl>
                        <div className='choose-button' onClick={() => {setImageFile(null);setMode('draw') }}>
                            <label  style={{
                                cursor:'pointer',
                                fontWeight:700
                            }}>
                            <DrawIcon style={{
                            fontSize:"40px",
                            
                            }}
                            />  Draw a sketch
                            </label>
                       </div>
  
                <div className='main-section'>
                    {
                        modeChosen === 'choose'?
                        <div className='input-image-box'>
                        {
                            inputImgSource && inputImgSource !== ''?
                            <img alt="Image preview" 
                            src={inputImgSource}
                            className='input-image'
                             />
                             :
                             <div className='pre-process-box' >
                                Input face sketch image
                             </div>
                        }
                        </div>
                        :
                         <div className="input-image-box">
                            <Canvas onInputUpdate = {(image) => {setInputSktech(image)}} />
                        </div>
                        
                        
                    }
                    
                    
                    <div style={{
                        display:'flex',
                        flexDirection:'column'
                    }}>
                        {
                            imageFile || modeChosen !== "choose" ?
                            <>
                            <div className='generate-button' onClick={invokeModelApi}>
                            Generate
                            </div>
                            
                            </>
                            :
                            <></>
                        }
                        
                        <i className="bi bi-arrow-right" style={{
                        color:'white',
                        fontSize:'80px',
                        marginLeft: "40px"
                    }}></i>
                    </div>
                    
                        <div className='output-image-box'>
                        {
                            outputImgSource && outputImgSource !== ''?
                            <img alt="Image preview" 
                            src={outputImgSource}
                            className='output-image'
                             />
                             :
                             
                             <div className='pre-process-box'>
                                {
                                    loading === true?
                                    <div className='loader'></div>
                                    :
                                    'Output realistic image'
                                }
                             </div>
                        }
                        </div>
                </div>
            </div>
        
        </>
    )
}
export default Home