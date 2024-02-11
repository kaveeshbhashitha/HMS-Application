import React, { useEffect, useState } from 'react'
import axios from "axios";
import SideBarPharmaacy from '../../components/SideBarPharmaacy'

export default function AvailableDrug() {
  const [message, setMessage] = useState(null);
  const [searchResult, setSearchResult] = useState('');

  const searchById = async () => {
    try {
      const response = await axios.get('http://localhost:8080/drugs/searchAll');
      setSearchResult(response.data); 
    } catch (error) {
      console.error('Error searching data', error);
      setMessage({ text: 'Error search a user', color: 'red' });
    }
  };

  useEffect(() => {
    searchById();
  }, []);

  return (
    <div>
      <SideBarPharmaacy/>
      <div className='button-fields-message'>
        <div>{ message && <div style={{ color: message.color }}>{message.text}</div>}</div>
      </div>
      <div>
        <div className='button-fields-message'>
          <table class="responsive-table">
            <thead>
              <tr>
                <th scope="col">Drugs ID</th>
                <th scope="col">Drug Name</th>
                <th scope="col">Available Quantity</th>
                <th scope="col">Drug store condition</th>
                <th scope="col">Drug Charge</th>
                <th scope="col">Drug Added Date</th>
              </tr>
            </thead>
            {searchResult.length > 0 && (
            <tbody>
              {searchResult.map((drug) => (
                <tr>
                  <th scope="row">{drug.drugId}</th>
                  <td>{drug.drugName}</td>
                  <td>{drug.drugQuantity}</td>
                  <td>{drug.drugStatus}</td>
                  <td>{drug.drugCharge}</td>
                  <td>{drug.drugAddedDate}</td>
                </tr>
                ))}
          </tbody>
          )}
          </table>
        </div>
     </div>
    </div>
  )
}
