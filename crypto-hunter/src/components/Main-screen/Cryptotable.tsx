import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.css';
import { get } from "../../API/apiClient";
import { coindetails } from "../../Type";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import TextField from '@mui/material/TextField';
import { Pagination } from '@mui/material';
import { orderBy } from 'lodash'; 
import { useNavigate } from 'react-router-dom';

const ITEMS_PER_PAGE = 5;

const Cryptotable = () => {

  const navigate = useNavigate();
  const api = useSelector((state: RootState) => state.api);
  const [list, setList] = useState<coindetails[]>([]);
  const [filteredItems, setFilteredItems] = useState<coindetails[]>([]);
  const [page, setPage] = useState(1);
  const [sortField, setSortField] = useState<string>(''); 
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc'); 

  useEffect(() => {
    fetchData();
  }, [api]);

  useEffect(() => {
    setFilteredItems(list);
  }, [list]);

  const fetchData = async () => {
    try {
      const result = await get<any>(`/${api}`);
      result && setList(result);
    } catch (error) {
      console.log(error);
    }
  };

  const searchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(1);
    const searchString = event.target.value.trim().toLowerCase();
    const filteredData = list.filter(item => item.name.toLowerCase().includes(searchString));
    setFilteredItems(filteredData);
  };

  const handleSort = (field: string) => {
    const newSortOrder = sortField === field ? (sortOrder === 'asc' ? 'desc' : 'asc') : 'asc';
    setSortField(field);
    setSortOrder(newSortOrder);
    const sortedData = orderBy(filteredItems, [field], [newSortOrder]);
    setFilteredItems(sortedData);
  };

  const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedItems = filteredItems.slice(startIndex, endIndex);

  const handleCoinDetail = (id : string) => {
    
    navigate(`/Coindetails/${id}`)

  }

  return (
    <div className='px-5 py-3 mt-2 bg-body-tertiary'>
      <div className='d-flex flex-column align-items-center mb-2'>
        <h1>Cryptocurrency Prices by Market Cap</h1>
      </div>

      <TextField label='Search For a Crypto Currency' className='form-control' onChange={searchHandler} />

      <Table striped responsive className='mt-4'>
        <thead className='table-success'>
          <tr>
            <th style={{cursor : 'pointer'}} onClick={() => handleSort('name')}>Coin {sortField === 'name' && (sortOrder === 'asc' ? '▲' : '▼')}</th>
            <th style={{cursor : 'pointer'}} onClick={() => handleSort('current_price')}>Price {sortField === 'current_price' && (sortOrder === 'asc' ? '▲' : '▼')}</th>
            <th style={{cursor : 'pointer'}} onClick={() => handleSort('price_change_percentage_24h')}>24h Change {sortField === 'price_change_percentage_24h' && (sortOrder === 'asc' ? '▲' : '▼')}</th>
            <th style={{cursor : 'pointer'}} onClick={() => handleSort('market_cap')}>Market Cap {sortField === 'market_cap' && (sortOrder === 'asc' ? '▲' : '▼')}</th>
          </tr>
        </thead>
        <tbody>
          {paginatedItems.map((item) => (
            <tr key={item.id}>
              <td>
                <div className='d-flex align-items-center' style={{cursor : 'pointer'}} onClick={() =>  handleCoinDetail(item.id)}>
                  <img src={item.image} alt={item.name} style={{ width: '65px', height: '70px' }} />
                  <div className='mx-3'>
                    <div><strong>{item.symbol.toUpperCase()}</strong></div>
                    <div>{item.name}</div>
                  </div>
                </div>
              </td>
              <td className='pt-4'>{item.current_price}</td>
              <td  className= {item.price_change_percentage_24h < 0 ? 'text-danger pt-4' : 'text-success pt-4'}>{item.price_change_percentage_24h}</td>
              <td className='pt-4'>{item.market_cap}</td>
            </tr>
          ))}
        </tbody>
      </Table>

<div className='d-flex justify-content-center '>
      <Pagination
        className='my-4'
        count={Math.ceil(filteredItems.length / ITEMS_PER_PAGE)}
        page={page}
        onChange={handleChangePage}
        color='secondary'
        variant='outlined'
        shape='rounded'
      />
      </div>
    </div>
  );
};

export default Cryptotable;
