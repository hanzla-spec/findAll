import React, { useEffect, useState } from 'react'
import './Home.css'
import Button from '../components/Button'
import SearchBar from '../assets/searching-bar.png'
import Check from '../assets/check.png'
import { Link } from 'react-router-dom'

function Home() {

    const [newName, setNewName] = useState("Ask Questions to");
    const [index, setIndex] = useState(0);

    useEffect(() => {
        console.log('effect main Home');
        const array = ["Ask Questions to", "Get Answers from", "Share Skills with"],
            intervalDurationMs = 2000

        let interval = setInterval(function () {
            setIndex((index + 1) % array.length)
            setNewName(array[index]);
        }, intervalDurationMs);

        return () => clearInterval(interval);
    }, [index])

    return (
        <div className='home_container'>
            <div className='joinus_container'>
                <div className='joinus'>
                    <div>
                        <img className='searchbar_img' src={SearchBar} alt='search-pic' />
                    </div>
                    <div>
                        <span className='home_title'>
                            Get your code from millions and share yours.
                        </span>
                    </div>
                    <div className='joinButton_div' >
                        <Link to='/register'><Button text='Join findAll team' type='light joinbtn' size='large' /></Link>
                    </div>
                </div>
            </div>
            <div className='question_container'>
                <div className='questions_div'>
                    <div className='question_title_div'>
                        <span className='question_title'>
                            <h2>Have a problem? you need code for.</h2>
                            <p>Submit the question to our Q&A platform and get
                                answered by the team out there on findAll</p>
                        </span>
                    </div>
                    <div className='joinButton_div'>
                        <Link to='/questions'><Button text='Ask Question' type='dark' size='large' /></Link>
                    </div>
                </div>
            </div>

            <div className='animation_container'>
                <div className='animation_div'>
                    <div className='move_div'>
                        <h1 id='move'>{newName}</h1>
                    </div>
                    <div className='animation_staticText'>
                        <span >
                            the community of findAll,
                            where time is worth spending.
                        </span>
                    </div>
                    <div className='image_check'>
                        <img src={Check} alt='check' />
                    </div>
                </div>
                <div className='stats_container'>
                    <div style={{ height: '10px', width: '100px', backgroundColor: 'grey', borderRadius: '10px', margin: '0px auto', marginTop: '100px' }}>
                    </div>
                    <div className='stats_div'>
                        <h1>1000+</h1>
                        <span>monthly visitors on findAll</span>
                        <div className='activeStatus_div'>
                            <h1>50+</h1>
                            <span>daily active users on findAll</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home