import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function Treatments() {
    const [message, setMessage] = useState(null);
    const [searchResult, setSearchResult] = useState('');
  
    let navigate = useNavigate();
  
    const searchById = async () => {
      try {
        const response = await axios.get('http://localhost:8080/prescription/searchAll');
        setSearchResult(response.data); 
      } catch (error) {
        console.error('Error searching data', error);
        setMessage({ text: 'Error search a user', color: 'red' });
      }
    };
  
    useEffect(() => {
      searchById();
    }, []);
  
    //cancel appointment
    const handleDelete = async (pRecId) => {
      try {
        const response = await axios.delete(`http://localhost:8080/prescription/delete/${pRecId}`);
        if (response.status === 200) {
          setMessage({ text: 'User was deleted successfully', color: 'green' });
          searchById();
        } else {
          setMessage({ text: 'Failed to cancel an delete user', color: 'red' });
          searchById();
        }
      } catch (error) {
        setMessage({ text: 'Error deleting user', color: 'red' });
      }
    };
  
    const handleNavigate = () => {
      navigate("/prescripe")
    };
  return (
    <div>
        <nav class="navbar navbar-light bg-light d-flex justify-content-end">
        <form class="form-inline d-flex">
          <div class="form-group mb-2">
          </div>
          <button type="submit" class="btn btn-primary mb-2 mx-1" onClick={handleNavigate}>Back To Doctor</button>
        </form>
        </nav>
          <div className='my-2 px-4'><h3>Prescription data</h3></div>
          <div className='px-4'>{ message && <div style={{ color: message.color }}>{message.text}</div>}</div>
          <div className='mx-1 p-1'>
            <table class="table table-hover">
              <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Age</th>
                    <th scope="col">Email</th>
                    <th scope="col">Diagnosis</th>
                    <th scope="col">Doctor</th>
                    <th scope="col">Note</th>
                    <th scope="col">Drug-01</th>
                    <th scope="col">Drug 02</th>
                    <th scope="col">Drug-03</th>
                    <th scope="col">Drug 04</th>
                    <th scope="col">Drug-05</th>
                    <th scope="col">Drug 06</th>
                    <th scope="col">Drug-07</th>
                    <th scope="col">Drug 08</th>
                    <th scope="col">Drug-08</th>
                    <th scope="col">Drug 10</th>
                    <th scope="col">Action</th>
                </tr>
              </thead>
              {searchResult.length > 0 && (
              <tbody>
                {searchResult.map((presc) => (
                  <tr>
                    <th scope="row">{presc.pRecId}</th>
                    <td>{presc.patientName}</td>
                    <td>{presc.patientAge}</td>
                    <td>{presc.patientEmail}</td>
                    <td>{presc.patientDiagnosis}</td>
                    <td>{presc.doctorName}</td>
                    <td>{presc.doctorNote}</td>
                    <td>{presc.drug01}</td>
                    <td>{presc.drug02}</td>
                    <td>{presc.drug03}</td>
                    <td>{presc.drug04}</td>
                    <td>{presc.drug05}</td>
                    <td>{presc.drug06}</td>
                    <td>{presc.drug07}</td>
                    <td>{presc.drug08}</td>
                    <td>{presc.drug08}</td>
                    <td>{presc.drug10}</td>
                    <td>
                        <button className='btn btn-danger mx-1' onClick={() => handleDelete(presc.pRecId)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-trash-fill" viewBox="0 0 16 16">
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                        </svg>
                        </button>
                        <button className='btn btn-warning'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-journal-plus" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 5.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 .5-.5z"/>
                        <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"/>
                        <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"/>
                        </svg>
                        </button>
                    </td>
                </tr>
                ))}
            </tbody>
            )}
            </table>
          </div>
      </div>
  )
}

