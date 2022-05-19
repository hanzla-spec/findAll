import React, { useEffect, useState } from 'react'
import './Pagination.css'
import { BsChevronRight, BsChevronLeft } from 'react-icons/bs'

function Pagination({ questionsPerPage, totalQuestions, paginate, currentPage }) {

    const [pageNumbers] = useState([])
    const [showedPageNumbers, setShowedPageNumbers] = useState([])
    const [startPageNum, setStartPageNum] = useState(0);


    const handlePageArrowLeft = () => {
        if (startPageNum === 0) {
            return;
        } else {
            const newStartPage = (startPageNum - 1) >= 0 ? (startPageNum - 1) : 0;
            const newLastPage = (startPageNum + 5) > Math.ceil(totalQuestions / questionsPerPage) ? Math.ceil(totalQuestions / questionsPerPage) : (startPageNum + 5 - 1)
            setStartPageNum(newStartPage);
            setShowedPageNumbers(pageNumbers.slice(newStartPage, newLastPage))
        }
    }


    const handlePageArrowRight = () => {
        if ((startPageNum + 5 + 1) > Math.ceil(totalQuestions / questionsPerPage)) {
            return;
        } else {
            const newLastPage = (startPageNum + 5 + 1);
            const newStartPage = (newLastPage - 5);
            setStartPageNum(newStartPage);
            setShowedPageNumbers(pageNumbers.slice(newStartPage, newLastPage))
        }
    }

    useEffect(() => {
        console.log('page-effect');
        if (showedPageNumbers.length === 0) {
            for (let i = 1; i <= Math.ceil(totalQuestions / questionsPerPage); i++) {
                pageNumbers.push(i);
            }
            setShowedPageNumbers(pageNumbers.slice(0, 5));
        }
    }, [showedPageNumbers, totalQuestions, questionsPerPage, pageNumbers])

    return (
        <div style={{ marginTop: '30px', paddingBottom: '30px' }}>
            <ul className='paginationQuestion_div'>
                <li onClick={() => handlePageArrowLeft()} className='eachPageNumber' style={{ marginRight: '8px' }}><BsChevronLeft /></li>
                {showedPageNumbers.map((num) => {
                    return (
                        <li onClick={() => paginate(num)} className='eachPageNumber' id={(currentPage === num) ? 'activePage' : 'inactivePage'} key={num}>{num}</li>
                    )
                })}
                <li onClick={() => handlePageArrowRight()} className='eachPageNumber' style={{ marginLeft: '8px' }}><BsChevronRight /></li>
            </ul>
        </div>
    )
}

export default Pagination