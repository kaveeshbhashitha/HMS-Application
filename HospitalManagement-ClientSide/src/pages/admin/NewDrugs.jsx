import React, { useState } from 'react'
import SideBarAdmin from '../../components/SideBarAdmin'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function NewDrugs() {

  const [message, setMessage] = useState(null);
  const [drug, setDrug] = useState('');

  let navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDrug({
      ...drug,
      [name]: value,
    });
  };
  //insert data 
  const handleSubmit = async (e) => {
    e.preventDefault();
    //form validation
    const isFormValid = Object.values(drug).every((value) => value !== '');
    if (!isFormValid) {
        setMessage({ text: 'All fields are required', color: 'red' });
        return;
    }
    try {
      const response = await axios.post('http://localhost:8080/drugs/add', drug);
      
      console.log('Drug inserted successfully:', response.data);
      setMessage({ text: 'Drug inserted successfully', color: 'green' });

      setDrug({
        drugName: '',
        drugQuantity: '',
        drugStatus: '',
        drugCharge: '',
        drugAddedDate: '',
      });

    } catch (error) {
      console.error('Error inserting data:', error);
      setMessage({ text: 'Error inserting data', color: 'red' });
    }
  };
  //clear data inthe text boxes
  const handleCler = () => {
    setDrug({
      userId: '',
      systemUserName: '',
      userEmail: '',
      userRole: '',
      userPassword: '',
    });
    setMessage('');
  };

  //navigate
  const handleNavigate = () => {
    navigate('/alldrugs');
  }

  return (
    <div>
      <SideBarAdmin/>
      <div className='button-fields-message'>
            <div>{ message && <div style={{ color: message.color }}>{message.text}</div>}</div>
        </div>
        <div className='body-opd-content'>
            <div><span className='opd-reg-topic'>Add new drug to stock</span></div>
            <form>
            <div className='input-fields-labels'>
                <div className='left-input-set'>
                    <div className='left-input-set'>
                        <label className='input-opd-label'>Drug Name</label>
                        <input className='input-opd-textboc' type="text" name="drugName" value={drug.drugName} onChange={handleChange} placeholder='Paracetomole'/>
                    </div>
                    <div className='left-input-set'>
                        <label className='input-opd-label'>Drug quontity</label>
                        <input className='input-opd-textboc' type="text" name="drugQuantity" value={drug.drugQuantity} onChange={handleChange} placeholder='####'/>
                    </div>
                    <div className='left-input-set'>
                        <label className='input-opd-label'>Drug store-in</label>
                        <select className='input-opd-textboc' name="drugStatus" value={drug.drugStatus} onChange={handleChange}>
                            <option value="">Select store option</option>
                            <option value="Cool">Cool</option>
                            <option value="Cool and dry">Cool and dry</option>
                            <option value="Hot">Hot</option>
                            <option value="Hot and dry">Hot and dry</option>
                        </select>
                    </div>
                </div>
                <div className='right-input-set'>
                  <div className='left-input-set'>
                        <label className='input-opd-label'>Drug charge</label>
                        <input className='input-opd-textboc' type="text" name="drugCharge" value={drug.drugCharge} onChange={handleChange} placeholder='Rs.####.##'/>
                    </div>
                    <div className='left-input-set'>
                        <label className='input-opd-label'>Drug added Date</label>
                        <input className='input-opd-textboc' type="text" name="drugAddedDate" value={drug.drugAddedDate} onChange={handleChange} placeholder='YYYY-MM-DD'/>
                    </div>
                    
                </div>
            </div>
            </form>
      </div>
        <div className='button-fields-labels p-2'>
          <button className='btn btn-success' onClick={handleSubmit}>Add drug</button>
          <button className='btn btn-primary mx-2' onClick={handleNavigate}>View drugs</button>
          <button className='btn btn-warning' onClick={handleCler}>Clear</button>
        </div>
    </div>
  )
}
