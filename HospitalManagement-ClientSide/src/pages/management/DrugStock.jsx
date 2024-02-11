import React, { useEffect, useState, useRef } from 'react'
import { useReactToPrint } from 'react-to-print';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import axios from "axios";
import SideBarManage from '../../components/SideBarManage'
import DrugStockChart from '../../components/DrugStockChart'
import '../../styles/manager.css'

export default function DrugStock() {

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

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <SideBarManage/>
      <div className='manager-box-set'>
        <h3 className='text-primary font-weight-bold'>Available Drug stocks</h3>
      </div>
      <div className='button-fields-message'>
            <div>{ message && <div style={{ color: message.color }}>{message.text}</div>}</div>
      </div>
      <div className='manager-box-set'>
        <DrugStockChart/>
      </div>
      <div className='button-fields-message'>
          <button onClick={handlePrint} className='btn btn-danger mx-2'>Export as PDF</button>

          <ReactHTMLTableToExcel
            id="excelButton"
            className="btn btn-success"
            table="table-to-xls"
            filename="drugStock"
            sheet="drugStock"
            buttonText="Export as Excel"
          />
        </div>
      <div className='button-fields-message'>
          <table class="responsive-table" ref={componentRef} id="table-to-xls">
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
  )
}
