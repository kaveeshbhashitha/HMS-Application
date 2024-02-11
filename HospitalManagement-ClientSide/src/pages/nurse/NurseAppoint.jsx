import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useParams } from 'react-router-dom';
import SideBarNurse from '../../components/SideBarNurse'

export default function NurseAppoint() {
    const [message, setMessage] = useState(null);
    const [searchResult, setSearchResult] = useState('');
  
    const{email} = useParams();
  
    const searchById = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/nurseAppoint/searchByNurseEmail/${email}`);
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
      <SideBarNurse/>
        <div className='button-fields-message'>
            <div>{ message && <div style={{ color: message.color }}>{message.text}</div>}</div>
        </div>
        <div className='button-fields-message'>
        <div className='my-2 px-4'><h5>Nurse appointment data</h5></div>
        </div>
        <div className='button-fields-message justify-content-center'>
          <div className='mx-1 p-1 '>
            <table class="responsive-table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Nurse name</th>
                  <th scope="col">Nurse Email</th>
                  <th scope="col">Appointed doctor </th>
                  <th scope="col">Doctor room</th>
                  <th scope="col">Date</th>
                  <th scope="col">Time</th>
                </tr>
              </thead>
              {searchResult.length > 0 && (
              <tbody>
                {searchResult.map((user) => (
                  <tr>
                  <th scope="row">{user.naId}</th>
                  <td>{user.userRole}</td>
                  <td>{user.nurseEmail}</td>
                  <td>{user.appointedDoctor}</td>
                  <td>{user.roomNumber}</td>
                  <td>{user.addedDate}</td>
                  <td>{user.appointedTime}</td>
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
