import React, { useEffect, useState } from 'react'
import axios from "axios";
import SideBarPharmaacy from '../../components/SideBarPharmaacy'
import { useNavigate, useParams, Link } from 'react-router-dom'

export default function Prescribe() {

  let navigate = useNavigate();
  const{id} = useParams();
  const [message, setMessage] = useState(null);
  const [searchResult, setSearchResult] = useState([]);

  const searchById = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/prescription/searchById/${id}`);
        setSearchResult(response.data); 
      } catch (error) {
        console.error('Error searching data', error);
        setMessage({ text: 'Error search a user', color: 'red' });
      }
  };

  useEffect(() => {
    searchById();
  }, []);

  const handleNavigate = () => {
      navigate('/issuedrug');
  };
  const handleAlert = () => {
    alert(`All drugs for ${searchResult.patientName} was issued successfully.`)
  };

  return (
    <div>
      <SideBarPharmaacy/>
      <div className='prescription-box-set'>
        <div>{ message && <div style={{ color: message.color }}>{message.text}</div>}</div>
      </div>
      <div className='prescription-box-set'>
        <div className='d-flex justify-content-between'>
          <input type="text" class="form-control" value={searchResult.patientName}/>
          <input type="text" class="form-control" value={searchResult.patientEmail}/>
          <input type="text" class="form-control" value={searchResult.patientAge}/>
          <input type="text" class="form-control" value={searchResult.doctorName}/>
          <input type="text" class="form-control" value={searchResult.patientDiagnosis}/>
        </div>
      </div>
      <div className='prescription-box-set'>
        <span className='presc-topic'>Doctor description and prescription</span>
          <div className='drug-name-set'>
            <div className='sick-detail-input'>
              <label>Drug 1</label>
              <input className='drug-name-inputs' type='text' value={searchResult.drug01}/>
            </div>
            <div className='sick-detail-input'>
              <label>Drug 2</label>
              <input className='drug-name-inputs' type='text' value={searchResult.drug02}/>
            </div>
            <div className='sick-detail-input'>
              <label>Drug 3</label>
              <input className='drug-name-inputs' type='text' value={searchResult.drug03}/>
            </div>
            <div className='sick-detail-input'>
              <label>Drug 4</label>
              <input className='drug-name-inputs' type='text' value={searchResult.drug04}/>
            </div>
          </div>
          <div className='drug-name-set'>
            <div className='sick-detail-input'>
              <label>Drug 5</label>
              <input className='drug-name-inputs' type='text' value={searchResult.drug05}/>
            </div>
            <div className='sick-detail-input'>
              <label>Drug 6</label>
              <input className='drug-name-inputs' type='text' value={searchResult.drug06}/>
            </div>
            <div className='sick-detail-input'>
              <label>Drug 7</label>
              <input className='drug-name-inputs' type='text' value={searchResult.drug07}/>
            </div>
            <div className='sick-detail-input'>
              <label>Drug 8</label>
              <input className='drug-name-inputs' type='text' value={searchResult.drug08}/>
            </div>
          </div>
          <div className='drug-name-set'>
            <div className='sick-detail-input'>
              <label>Drug 9</label>
              <input className='drug-name-inputs' type='text' value={searchResult.drug09}/>
            </div>
            <div className='sick-detail-input'>
              <label>Drug 10</label>
              <input className='drug-name-inputs' type='text' value={searchResult.drug10}/>
            </div>
            <div className='sick-detail-input'>
              <button className='button-doctor-help' onClick={handleAlert}>Issue Drugs</button>
            </div>
            <div className='sick-detail-input'>
              <button className='button-doctor-help' onClick={handleNavigate}>Cancel</button>
            </div>
          </div>
      </div>
    </div>
  )
}
