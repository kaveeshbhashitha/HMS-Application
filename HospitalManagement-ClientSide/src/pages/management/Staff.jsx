import React, { useEffect, useState, useRef } from 'react'
import { useReactToPrint } from 'react-to-print';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import axios from "axios";
import SideBarManage from '../../components/SideBarManage'
import UserRolePieChart from '../../components/UserRolePieChart'
import '../../styles/manager.css'

export default function Staff() {

  const [message, setMessage] = useState(null);
  const [searchResult, setSearchResult] = useState('');
  
  const searchById = async () => {
    try {
      const response = await axios.get('http://localhost:8080/user/searchAll');
      setSearchResult(response.data); 
    } catch (error) {
      console.error('Error searching data', error);
      setMessage({ text: 'Error search a user', color: 'red' });
    }
  };

  useEffect(() => {
    searchById();
  }, []);

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <SideBarManage/>
      <div className='manager-box-set'>
        <h3 className='text-primary font-weight-bold'>System users and human resource of the hospital</h3>
      </div>
      <div className='button-fields-message'>
            <div>{ message && <div style={{ color: message.color }}>{message.text}</div>}</div>
      </div>
      <div className='manager-box-set'>
        <UserRolePieChart/>
      </div>
      <div className='button-fields-message'>
          <button onClick={handlePrint} className='btn btn-danger mx-2'>Export as PDF</button>

          <ReactHTMLTableToExcel
            id="excelButton"
            className="btn btn-success"
            table="table-to-xls"
            filename="staffData"
            sheet="staffData"
            buttonText="Export as Excel"
          />
        </div>
      <div className='button-fields-message'>
          <table class="responsive-table" ref={componentRef} id="table-to-xls">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">User ID</th>
                <th scope="col">Employee Name</th>
                <th scope="col">Emaployee Email</th>
                <th scope="col">Password</th>
                <th scope="col">Employee role</th>
              </tr>
            </thead>
            {searchResult.length > 0 && (
              <tbody>
                {searchResult.map((user) => (
                  <tr>
                  <th scope="row">{user.suId}</th>
                  <td>{user.userId}</td>
                  <td>{user.systemUserName}</td>
                  <td>{user.userEmail}</td>
                  <td>{user.userPassword}</td>
                  <td>{user.userRole}</td>
                </tr>
                ))}
            </tbody>
            )}
          </table>
          
        </div>
        
    </div>
  )
}