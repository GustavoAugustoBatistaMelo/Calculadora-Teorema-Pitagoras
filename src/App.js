import './App.css';
import img from './Img/img.webp';
import axios from "axios";
import { useState } from 'react';
import {validateFields,} from './validate'

function App() {
  const [result, setResult] = useState(false);
  const [triangle, setTriangle] = useState({ ladoA: "", ladoB: "", ladoC: "" });
  const [disableFild, setDisableField] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  
   

  const calculate = () => {
    let { ladoA, ladoB, ladoC } = triangle;

    if (validateFields(ladoA, ladoB, ladoC)) {
        
      alert("digite apenas dois Campos");
      
    } else if (ladoA && ladoB) {
      axios.get(`https://flask-api-app.herokuapp.com/api/pythagorean-theorem`, { params: { a: ladoA, b:ladoB } }).
        then((response) => {
          setTriangle({ ...triangle, ladoC: response.data.payload.toFixed(2) })
          setResult(true);
          setDisableField(true);
          setDisableButton(true);
        }).catch(error => {
          if (error.response) {
            alert(error.response.data.message);
          } else {
            alert(error.message);
          }   
        });            
      }  
      else if (ladoA && ladoC) {  
       axios.get(`https://flask-api-app.herokuapp.com/api/pythagorean-theorem`, { params: { a: ladoA, h:ladoC } }).
       then((response) => {
         setTriangle({ ...triangle, ladoB: response.data.payload.toFixed(2) });
         setResult(true);
         setDisableField(true);
         setDisableButton(true);
       }).catch(error => {
         if (error.response) {
           if (ladoA > ladoC) {
             alert("O valor da Hipotenusa ='ladoC' não pode ser menor que o do cateto");
           } else {
             alert(error.response.data.message);
           }
         } else {
            alert(error.message);
         }   
       });
      } else if (ladoB && ladoC) {
         axios.get(`https://flask-api-app.herokuapp.com/api/pythagorean-theorem`, { params: { b: ladoB, h:ladoC } }).
         then((response) => {
           setTriangle({ ...triangle, ladoA: response.data.payload.toFixed(2) });
           setResult(true);
           setDisableField(true);
           setDisableButton(true);
         }).catch(error => {
           if (error.response) {
            if (ladoA < ladoC) {
              alert("O valor da Hipotenusa ='ladoC' não pode ser menor que o do cateto")
            } else {
              alert(error.response.data.message);
            }
           } else {
             alert(error.message);
           }   
         });
       }
  }

  const clearEntry = () => {
    setTriangle({ ladoA: "", ladoB: "", ladoC: "" });
    setResult(false);
    setDisableButton(false);
    setDisableField(false);
  }

  
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (!isNaN(value)) {
     setTriangle({ ...triangle, [name]: value });
    } 
  }

  return (
   
    <div id='main'> 
     
      <img className="image" src={img} />  
      <div id="input">
        <label> A </label>
        <input className="values" disabled={disableFild}  onChange={handleChange} name="ladoA" value={triangle.ladoA} type="text" />
        <label> B </label>
        <input className="values" disabled={disableFild} onChange={handleChange} value={triangle.ladoB} name="ladoB" type="text" />   
        <label> C </label>
        <input className="values" disabled={disableFild} onChange={handleChange} value={triangle.ladoC} name="ladoC" type="text" />
      </div>

      <div id="sectionButtons">
        <button onClick={calculate} disabled={disableButton} className="button"  type="submmit">Clacular</button>
        <button  onClick={clearEntry} className="button" type="submmit">Limpar</button>
      </div>
      
      { result &&
        <div id="contentResult">
         <span>Resultado</span>
          <span>c² = a² + b² </span>
          <div id="Result">
            <span>C = {triangle.ladoC} </span>
            <span>A = {triangle.ladoA} </span>
            <span>B = {triangle.ladoB} </span>
          </div>
        </div>
      }
     
    </div>
  );
}

export default App;
