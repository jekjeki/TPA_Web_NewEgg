import React from 'react'
import { Link } from 'react-router-dom'
import './style/paginationStyle.scss'

export default function Pagination({userPerPage,totalUsers, paginate}:{userPerPage:number, totalUsers:number, paginate:any}) {
    const pageNumbers = []
    for(let i=1; i<=Math.ceil(totalUsers / userPerPage); i++){
        pageNumbers.push(i)
    }
  return (
    <nav>
        <ul className='pagination'>
            {
                pageNumbers.map(number => {
                    return(
                        <li key={number} className='page-item'>
                            <Link to={'#'} className='page-link' onClick={()=>paginate(number)}>
                                {number}
                            </Link>
                        </li>
                    )
                })
            }
        </ul>
    </nav>
  )
}
