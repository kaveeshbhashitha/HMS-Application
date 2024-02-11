import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function AllDrugs() {
    const [message, setMessage] = useState(null);
    const [searchResult, setSearchResult] = useState('');
  
    let navigate = useNavigate();
  
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
  
    //cancel appointment
    const handleDelete = async (suId) => {
      try {
        const response = await axios.delete(`http://localhost:8080/drugs/delete/${suId}`);
        if (response.status === 200) {
          setMessage({ text: 'Drug was deleted successfully', color: 'green' });
          searchById();
        } else {
          setMessage({ text: 'Failed to delete Drug', color: 'red' });
          searchById();
        }
      } catch (error) {
        setMessage({ text: 'Error deleting Drug', color: 'red' });
      }
    };
  
    const handleNavigate = () => {
      navigate("/newdrug")
    };
  return (
    <div>
        <nav class="navbar navbar-light bg-light d-flex justify-content-end">
        <form class="form-inline d-flex">
          <div class="form-group mb-2">
          </div>
          <button type="submit" class="btn btn-primary mb-2 mx-1" onClick={handleNavigate}>Back To Drugs</button>
        </form>
        </nav>
          <div className='my-2 px-4'><h3>Drugs data</h3></div>
          <div className='px-4'>{ message && <div style={{ color: message.color }}>{message.text}</div>}</div>
          <div className='mx-1 p-1'>
            <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Drugs ID</th>
                  <th scope="col">Drug Name</th>
                  <th scope="col">Available Quantity</th>
                  <th scope="col">Drug store condition</th>
                  <th scope="col">Drug Charge</th>
                  <th scope="col">Drug Added Date</th>
                  <th scope="col">Action</th>
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
                  <td>
                    <button className='btn btn-danger mx-1' onClick={() => handleDelete(drug.drugId)}>
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
