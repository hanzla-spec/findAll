import Button from '../components/Button'
import { AiOutlineLike } from 'react-icons/ai'
import { TiTickOutline } from 'react-icons/ti'
import { GrOverview } from 'react-icons/gr'
import React, { useEffect, useRef, useState } from 'react'
import './Main.css'
import { Link } from 'react-router-dom'
import { BsFilter } from 'react-icons/bs'
import Filter from './Filter'
import Tag from '../Question/Tag'
import avatar from '../assets/avatar-1.png'
import UseOutsideClick from '../hooks/UseOutsideClick'
import questionService from '../services/questionService'
import toast from 'react-hot-toast'
import { FiInfo } from 'react-icons/fi'
import Loader from '../assets/Loader.gif'
import Pagination from './Pagination'


function Main() {

    function html2text(html) {
        var tag = document.createElement('div');
        tag.innerHTML = html;

        return tag.innerText;
    }

    const [isFilterShow, setIsFilterShow] = useState(false);
    const filterRef = useRef(null);
    const handleFilter = () => { setIsFilterShow(!isFilterShow); }
    const handleFilterRef = () => setIsFilterShow(false);
    const [tags] = useState(["java", "css", "python", "cspring", "cboot", "c++", "csat", "c#", "csharp", "c/c++"])
    const [allQuestions, setAllQuestions] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [filteredQuestions, setFilteredQuestions] = useState([]);
    UseOutsideClick(filterRef, handleFilterRef);

    // pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [questionsPerPage] = useState(2);
    const [currentPageQuestions, setCurrentPageQuestions] = useState([]);

    const paginate = (currPage) => {
        const indexOfLastQuestion = currPage * questionsPerPage;
        const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
        setCurrentPage(currPage);

        setCurrentPageQuestions(
            filteredQuestions.slice(indexOfFirstQuestion, indexOfLastQuestion));


    }


    //to pass on to filter component
    const [filterKeys, setFilterKeys] = useState([]);

    const filterQuestionsByTags = () => {

        if (filterKeys.length !== 0) {
            setFilteredQuestions(allQuestions.filter((ques) => {
                if (ques.tags.trim() === '') {
                    return false;
                } else {
                    let queTagsArray = ques.tags.split(' ');
                    let res = false;
                    filterKeys.forEach(element => {
                        res = (queTagsArray.find(f => f === element) !== undefined) ? true : false;

                    });
                    return res;
                }
            }))

            const indexOfLastQuestion = currentPage * questionsPerPage;
            const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
            setCurrentPageQuestions(
                filteredQuestions.slice(indexOfFirstQuestion, indexOfLastQuestion));
        }

        console.log('questions filtered !');
        setFilterKeys([]);
    }


    //filter questions by All
    const showAllQuestions = () => {
        setFilteredQuestions(allQuestions);
        setIsFilterShow(false)
        const indexOfLastQuestion = currentPage * questionsPerPage;
        const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
        setCurrentPageQuestions(
            filteredQuestions.slice(indexOfFirstQuestion, indexOfLastQuestion));


    }
    //filter questions by newest questions

    const filterQuestionsByNewest = () => {

        setFilteredQuestions(filteredQuestions.sort((a, b) => {
            if (a.isEdited === 'true' && b.isEdited === 'true') {
                return b.editedAt - a.editedAt;
            } else if (a.isEdited === 'true' && b.isEdited === 'false') {
                return b.postedAt - a.editedAt;
            } else if (a.isEdited === 'false' && b.isEdited === 'true') {
                return b.editedAt - a.postedAt;
            } else {
                return b.postedAt - a.postedAt;
            }
        }));
        setIsFilterShow(false)

        const indexOfLastQuestion = currentPage * questionsPerPage;
        const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
        setCurrentPageQuestions(
            filteredQuestions.slice(indexOfFirstQuestion, indexOfLastQuestion));

    }

    // filtered question by answered

    const filterQuestionsByAnswered = () => {

        setFilteredQuestions(filteredQuestions.sort((a, b) => b.noOfAnswers - a.noOfAnswers));
        setIsFilterShow(false)

        const indexOfLastQuestion = currentPage * questionsPerPage;
        const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
        setCurrentPageQuestions(
            filteredQuestions.slice(indexOfFirstQuestion, indexOfLastQuestion));


    }

    // question by unaswered
    const filterQuestionByUnanswered = () => {
        setFilteredQuestions(filteredQuestions.filter(f => f.noOfAnswers === 0));
        setIsFilterShow(false)
        const indexOfLastQuestion = currentPage * questionsPerPage;
        const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
        setCurrentPageQuestions(
            filteredQuestions.slice(indexOfFirstQuestion, indexOfLastQuestion));


    }

    //filter question by top rated

    const filterQuestionsByTopVoted = () => {
        setFilteredQuestions(filteredQuestions.sort((a, b) => b.noOfVotes - a.noOfVotes));
        setIsFilterShow(false)
        const indexOfLastQuestion = currentPage * questionsPerPage;
        const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
        setCurrentPageQuestions(
            filteredQuestions.slice(indexOfFirstQuestion, indexOfLastQuestion));


        console.log('top');
    }

    //filter by most viewed 

    const filterQuestionsByTopViewed = () => {

        setFilteredQuestions(filteredQuestions.sort((a, b) => b.noOfViews - a.noOfViews));
        setIsFilterShow(false)
        const indexOfLastQuestion = currentPage * questionsPerPage;
        const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
        setCurrentPageQuestions(
            filteredQuestions.slice(indexOfFirstQuestion, indexOfLastQuestion));


    }


    useEffect(() => {
        console.log('question-main-effect');

        if (allQuestions.length === 0) {
            setIsLoading(true);
            (async () => {
                await questionService.getAllVQuestions().then(
                    (res) => {
                        setAllQuestions(res.data);
                        setFilteredQuestions(res.data);
                        setCurrentPageQuestions(res.data.slice((currentPage * questionsPerPage - questionsPerPage), currentPage * questionsPerPage))
                        // tags load
                        setIsLoading(false);

                    }, (error) => {
                        if (error.response.status !== 500) {
                            toast((t) => (
                                <span><FiInfo />{error.response.message}</span>
                            ))
                        } else {
                            toast((t) => (
                                <span><FiInfo />&nbsp;Server error! We are sorry for our bad service.Please try after some time.</span>
                            ))
                        }
                        setIsLoading(false);
                    }
                ).catch((ex) => {
                    toast((t) => {
                        <span><FiInfo />&nbsp;We are sorry for the trouble in loading questions. please try again</span>
                    })
                    setIsLoading(false);
                }).finally(() => {
                    setIsLoading(false);
                })
            })();
        }

    }, [allQuestions, currentPage, questionsPerPage, currentPageQuestions])

    return (
        <div className='questionMain_container'>

            {
                isLoading &&
                <div id="loading">
                    <img id="loading-image" src={Loader} alt="Loading..." />
                </div>
            }

            <div className='questionNavbar_div'>
                <div className='questionFirstNavbar_div'>
                    <div className='allQuestion_heading'>
                        <h3>All Questions</h3>
                        <p style={{ fontSize: '.75rem' }}>{allQuestions.length}&nbsp;&nbsp; results</p>
                    </div>
                    <div className='askQuestionButton_div'>
                        <Link className='askQuestionButtons' to='/questions/ask'><Button text="Ask Question" type="dark" size="small" /></Link>
                    </div>
                </div>
                <div className='questionSecondNavbar_div'>
                    <div className='filterButtons_div'>
                        <div onClick={showAllQuestions}><Button text="all" type="light" size="extra_small" /></div>
                        <div onClick={filterQuestionsByNewest}><Button text="new" type="light" size="extra_small" /></div>
                        <div onClick={filterQuestionsByTopVoted}><Button text="top" type="light" size="extra_small" /></div>
                        <div onClick={filterQuestionsByAnswered} ><Button text="answered" type="light" size="extra_small" /></div>
                    </div>
                    <div ref={filterRef} className='filterByTags_div'>
                        <button onClick={handleFilter} className='filterByTags_button'><BsFilter />&nbsp;filter</button>
                        {
                            isFilterShow &&
                            <Filter tags={tags} filterKeys={filterKeys} setFilterKeys={setFilterKeys}
                                setIsFilterShow={setIsFilterShow} filterQuestionsByTags={filterQuestionsByTags}
                                filterQuestionsByNewest={filterQuestionsByNewest} filterQuestionsByTopVoted={filterQuestionsByTopVoted}
                                filterQuestionsByAnswered={filterQuestionsByAnswered} filterQuestionByUnanswered={filterQuestionByUnanswered}
                                filterQuestionsByTopViewed={filterQuestionsByTopViewed} />
                        }
                    </div>
                </div>
            </div>



            <div className='questionsList_div'>
                <ul className='questionsUnorderList'>

                    {currentPageQuestions.map((question) => (



                        <li key={question.questionId} className='eachQuestion_list'>
                            <div className='eachQuestion_div'>

                                <div className='eachQuestionStats_div'>
                                    <ul className='eachQuestion_stats'>
                                        <li><AiOutlineLike />{question.noOfVotes} Likes</li>
                                        <li><TiTickOutline />{question.noOfAnswers} answers</li>
                                        <li><GrOverview />&nbsp;{question.noOfViews} views</li>

                                    </ul>
                                </div>
                                <div className='eachQuestion_details'>
                                    <p className='eachQuestion_title'>{question.title}</p>
                                    <p className='eachQuestion_body'>
                                        {html2text(question.body).slice(0, 150)}...
                                    </p>
                                </div>
                                <div className='eachQuestionTags_div'>
                                    {
                                        (question.tags.trim() !== '') &&

                                        question.tags.split(' ').map((tag) => (

                                            <Tag text={tag} key={tag} />
                                        ))
                                    }

                                </div>
                                <div className='eachQuestionProfile_div'>
                                    <div className='eachQuestionProfile_userInfo'>
                                        <Link to='/' className='avatarDisplayName_div'>
                                            <img className='avatarForQuestion' src={avatar} alt='avatar' />&nbsp;
                                            <span className='usersDisplayName'>{question.displayName}</span>
                                        </Link>
                                        <span>&nbsp;&nbsp;{question.points}&nbsp;points</span>
                                    </div>
                                    <div className='eachQuestionAskedAt'>

                                        {
                                            question.isEdited === 'true' ?
                                                <span>edited&nbsp;{new Date(question.editedAt).toLocaleString("en-US", { month: "short" })}
                                                    &nbsp;{new Date(question.editedAt).toLocaleString("en-US", { day: "numeric" })}
                                                    ,&nbsp;{new Date(question.editedAt).toLocaleString("en-US", { year: "numeric" })}
                                                </span>


                                                :
                                                <span>posted&nbsp;{new Date(question.askedAt).toLocaleString("en-US", { month: "short" })}
                                                    &nbsp;{new Date(question.askedAt).toLocaleString("en-US", { day: "numeric" })}
                                                    ,&nbsp;{new Date(question.askedAt).toLocaleString("en-US", { year: "numeric" })}
                                                </span>
                                        }
                                    </div>

                                </div>
                            </div>

                        </li>


                    ))}
                </ul>

            </div>

            <Pagination questionsPerPage={questionsPerPage} totalQuestions={filteredQuestions.length} paginate={paginate} currentPage={currentPage} />
        </div>
    )
}

export default Main