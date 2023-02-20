import { list } from 'firebase/storage'
import React, { useEffect, useMemo, useState } from 'react'
import AdminNavbar from '../../adminComponent/AdminNavbar'
import Pagination from '../../pagination/Pagination'
import './style/listUserStyle.scss'

export default function ListUsers() {

    const [users, setUsers] = useState<any[]>([])
    const [currPage, setCurrPage] = useState<number>(1)
    const [userPerPage] = useState<number>(10)
    const [clickBan, setClickBan] = useState<boolean>(true)
    const [unclickBan, setUnclickBan] = useState<boolean>(true)
    const [id, setID] = useState<any>('')

    const indexOfLastUser = currPage * userPerPage
    const indexOfFirstUser = indexOfLastUser - userPerPage
    const currUsers = users.slice(indexOfFirstUser, indexOfLastUser)

    //get data row
    const getDataRow = (id:any) => {
      
      console.log(id)
      setID(id)
      
      
    }

    //ban click
    const banClick = async () => {
      setClickBan(clickBan)

      console.log(clickBan +":"+id)

      await fetch('http://localhost:8000/api/admin/ban-users',{
        method:'PUT',
        body: JSON.stringify({
          id: id,
          statususer: "banned"
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
      })
      .then((res)=>console.log(res.json()))
    }

    //unban
    const unbanClick = async () => {
        setUnclickBan(unclickBan)

        console.log(unclickBan+":"+id)

        await fetch('http://localhost:8000/api/admin/ban-users',{
          method:'PUT',
          body: JSON.stringify({
            id: id,
            statususer: "active"
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          }
        })
        .then((res)=>console.log(res.json()))
    }


    //fetch users 
    const fetchUsersData = async () => {
        await fetch('http://localhost:8000/api/admin/users', {
          method:'GET',
          headers: {
            'Content-type':'application/json;charset=UTF-8'
        }
        })
        .then((res)=>res.json())
        .then((data) => {
          setUsers(data.users_all)
        })
    }

    const paginate = (pageNumber:number) => setCurrPage(pageNumber)

    useEffect(() => {
      fetchUsersData()
    }, [])

  return (
    <div>
        <AdminNavbar />
        <div className='wrap-title'>
          <h3>Manage Users</h3>
        </div>
        <div className='wrap-list-users-page'>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>First name</th>
                <th>Last name</th>
                <th>Role</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Email Subscribe</th>
                <th>Status</th>
                
              </tr>
            </thead>
            <tbody>
              {
                currUsers.map((us, idx) => {
                  return(
                    <tr key={idx} onClick={()=>getDataRow(us.ID)} className={`tr-active`}>
                      <td>{us.ID}</td>
                      <td>{us.FirstName}</td>
                      <td>{us.LastName}</td>
                      <td>{us.Role}</td>
                      <td>{us.Email}</td>
                      <td>{us.Phone}</td>
                      <td>{us.Subscribe}</td>
                      <td>{us.StatusUser}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
          <Pagination userPerPage={userPerPage} 
          totalUsers={users.length} 
          paginate={paginate}/>
          
        </div>
        <div className='wrap-btn-ban'>
            <button className='ban-btn' onClick={banClick}>ban</button>
            <button className='unban-btn' onClick={unbanClick}>unban</button>
          </div>
    </div>
  )
}
