import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import './EachQuestion.css'
import Button from '../components/Button'
import { BiUpvote } from 'react-icons/bi'
import avatar from '../assets/avatar-1.png'
import SilverMedal from '../assets/silver-medal.png'
import RichTextEditor from "react-rte";
import Tag from './Tag';
import { FcInfo } from 'react-icons/fc'
import loginService from '../services/loginService'
import questionService from '../services/questionService'
import answerService from '../services/answerService';
import toast from 'react-hot-toast';
import Loader from '../assets/Loader.gif'

class EachQuestion extends Component {


    state = {
        questionId: '',
        body: RichTextEditor.createEmptyValue(),
        question: {},
        answers: [],
        isLoading: false,
        loggedInUserId: loginService.isUserLogin() ? JSON.parse(localStorage.getItem("USER")).userId : null,
    }

    html2text = (html) => {
        var tag = document.createElement('div');
        tag.innerHTML = html;

        return tag.innerText;
    }

    componentDidMount() {

        window.scrollTo({ top: 0, left: 0 })

        const question_id = window.location.pathname.split('/')[2].trim();
        this.setState({ questionId: question_id })
        this.setState({ isLoading: true });
        //load question
        (async () => {
            questionService.getQuestionByQuestionId(question_id).then(
                (res) => {
                    this.setState({ question: res.data })
                    console.log(res.data);

                    questionService.upViewQuestion(question_id).then(
                        (res) => {
                            console.log('view count ++');
                        }, (error) => {
                            console.log('error occured');
                        }
                    )

                    answerService.getAnswersOfQuestion(question_id).then(
                        (res) => {
                            this.setState({ answers: res.data })
                            console.log(res.data);
                        }, (error) => {
                            console.log(error.response);
                            if (error.response && error.response.status === 403 && error.response.data.message === 'No answers found') {
                                toast((t) => (
                                    <span><FcInfo />&nbsp;{error.response.data.message}</span>
                                ))
                            } else {
                                toast((t) => (
                                    <span><FcInfo />&nbsp;There is some issue laoding the asnwers,Please try again</span>
                                ))
                            }
                        }
                    )

                }, (error) => {
                    toast((t) => (
                        <span><FcInfo />&nbsp;There is some issue laoding the question,Please try again</span>
                    ))
                }
            ).catch((ex) => {
                console.log('server error in laoding question');
            }).finally(() => {
                this.setState({ isLoading: false })
            })
        })();

        //load answers
    }

    componentDidUpdate() {
        console.log('update');
    }


    onChange = body => {
        this.setState({ body });
    }

    upvoteQuestion = async () => {
        if (loginService.isUserLogin()) {

            const fetchData = async () => {
                const res = await questionService.voteQuestion({
                    userId: this.state.loggedInUserId,
                    questionId: this.state.questionId
                })
                return res;
            }
            toast.promise(fetchData(), {
                loading: 'voting...', success: 'Question voted', error: (err) =>
                    (err.response && err.response.data.message_code === -1) ? "You've already voted the question" : 'Error occured'
            })

        } else {
            toast((t) => (
                <span><FcInfo />&nbsp;Please login</span>
            ))
        }
    }
    upvoteAnswer = async (answerId) => {
        if (loginService.isUserLogin()) {

            const fetchData = async () => {
                const res = await answerService.upvoteAnswer({
                    userId: this.state.loggedInUserId,
                    answerId: answerId
                })
                return res;
            }
            toast.promise(fetchData(), {
                loading: 'voting...', success: 'Answer voted', error: (err) =>
                    (err.response && err.response.data.message_code === -1) ? "You've already voted the question" : 'Error occured'
            })
        } else {
            toast((t) => (
                <span><FcInfo />&nbsp;Please login</span>
            ))
        }
    }
    postAnswer = () => {

        if (loginService.isUserLogin()) {
            this.setState({ isLoading: true })
            answerService.postAnswer({
                questionId: this.state.question.questionId,
                userId: this.state.loggedInUserId,
                body: this.state.body.toString('html')
            }).then(
                (res) => {
                    toast.success('Answer posted')
                }, (err) => {
                    toast((t) => (
                        <span><FcInfo />&nbsp;Asnwer not posted.</span>
                    ))
                }
            ).catch((ex) => {
                console.log('server error');
            }).finally(() => {
                this.setState({ isLoading: false })
            })
        } else {
            toast((t) => (
                <span><FcInfo />&nbsp;Please login</span>
            ))
        }
    }

    render() {

        return (
            <div className='eachQuestion__Main_container'>

                {
                    this.state.isLoading &&
                    <div id="loading">
                        <img id="loading-image" src={Loader} alt="Loading..." />
                    </div>
                }

                <div className='eachQuestion__Main_div'>
                    <div className='eachQuestion__Stats_div'>
                        <div className='eachQuestion__btn_div'>
                            <Link to='/questions/ask'><Button text='Ask Question' type='dark' size='medium' /></Link>
                        </div>
                        <h3>{this.state.question.title}</h3>
                        <div className='question__stats'>
                            {
                                this.state.question.isEdited === 'true' ?
                                    <span style={{ display: 'block', margin: '10px 0px', color: 'var(--clr-grey-3)' }}>Edited at&nbsp;{new Date(this.state.question.editedAt).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}</span>
                                    :
                                    <span style={{ display: 'block', margin: '10px 0px', color: 'var(--clr-grey-3)' }}>Asked at&nbsp;{new Date(this.state.question.askedAt).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}</span>
                            }

                            <div className='stats_data_div'>
                                <span>views:&nbsp;<b style={{ color: 'var(--blue-minded)' }}>{this.state.question.noOfViews}</b></span>&nbsp;&nbsp;
                                <span>votes:&nbsp;<b style={{ color: 'var(--blue-minded)' }}>{this.state.question.noOfVotes}</b></span>&nbsp;&nbsp;
                                <span>answers:&nbsp;<b style={{ color: 'var(--blue-minded)' }}>{this.state.question.noOfAnswers}</b></span>
                                <BiUpvote onClick={() => this.upvoteQuestion()} style={{ marginLeft: '80px' }} title='upvote' className='upvote_btn' />
                            </div>
                        </div>

                    </div>

                    <div className='eachQuestion__MainDetails_div'>
                        <div className='eachQuestionBody' dangerouslySetInnerHTML={{ __html: this.state.question.body }}>
                        </div>

                        <div className='tagsOfQuestion_div'>

                            {this.state.question.tags !== undefined && this.state.question.tags.trim() !== '' &&
                                this.state.question.tags.split(' ').map((tag, index) => {

                                    return (<Tag text={tag} key={index} />)
                                })}
                        </div>

                        <div className='profileAndTimeDetails_div'>

                            <div className='answeredTiming_div'>
                                {
                                    this.state.question.isEdited === 'true' ?
                                        <span>
                                            Edited<br />at&nbsp;{new Date(this.state.question.editedAt).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                                        </span>
                                        :
                                        <span>
                                            Asked<br />at&nbsp;{new Date(this.state.question.askedAt).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                                        </span>
                                }
                            </div>

                            <Link to='/'>
                                <div className='profileDetails_div'>

                                    <div className='questionAvatar_div'>
                                        <img src={avatar} alt='avatar' />
                                    </div>
                                    <div className='profileStats_div'>

                                        {
                                            (this.state.loggedInUserId === this.state.question.userId) ?
                                                <b style={{ color: 'var(--blue-minded)' }}>You</b> :
                                                <b style={{ color: 'var(--blue-minded)' }}>{this.state.question.displayName}</b>

                                        }

                                        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '5px' }}>
                                            <b style={{ color: 'black' }}>{this.state.question.points}&nbsp;points</b>&nbsp;
                                            <img src={SilverMedal} alt='silver medal' />
                                        </div>
                                    </div>

                                </div>
                            </Link>

                        </div>

                    </div>

                </div>



                {/* answers list here */}

                <div className='answersMain_div'>

                    <div className='totalAnswersHeader_div'>

                        <span><b>{this.state.question.noOfAnswers}</b>&nbsp;Answers</span>
                        <span style={{ color: 'var(--blue-minded)', marginLeft: '50px' }}>sort by:</span>
                        <select style={{ marginLeft: '10px', padding: '5px' }}>
                            <option>Top voted</option>
                            <option>Newest</option>
                        </select>
                    </div>

                    <div className='totalAnswersMain_div'>

                        {
                            this.state.answers.length !== 0 &&
                            this.state.answers.map((answer, index) => {

                                return (
                                    <div className='eachAnswerIteration_div' key={index}>

                                        <div className='stats_data_div statsAnswer_data_div'>

                                            <span>votes:&nbsp;<b style={{ color: 'var(--blue-minded)' }}>{answer.noOfVotes}</b></span>&nbsp;&nbsp;
                                            <span>comments:&nbsp;<b style={{ color: 'var(--blue-minded)' }}>{answer.noOfComments}</b></span>
                                            <BiUpvote onClick={() => this.upvoteAnswer(answer.answerId)} style={{ marginLeft: '150px' }} title='upvote' className='upvote_btn' />
                                        </div>

                                        <div className='answerBody' dangerouslySetInnerHTML={{ __html: answer.body }}>

                                        </div>
                                        <div className='profileAndTimeDetails_div'>

                                            <div className='answeredTiming_div'>
                                                {
                                                    answer.isEdited === 'true' ?
                                                        <span>
                                                            Edited<br />at&nbsp;{new Date(answer.editedAt).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                                                        </span>
                                                        :
                                                        <span>
                                                            Answered<br />at&nbsp;{new Date(answer.answeredAt).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                                                        </span>
                                                }
                                            </div>

                                            <Link to='/'>
                                                <div className='profileDetails_div'>

                                                    <div className='questionAvatar_div'>
                                                        <img src={avatar} alt='avatar' />
                                                    </div>
                                                    <div className='profileStats_div'>
                                                        <b style={{ color: 'var(--blue-minded)' }}>{(this.state.loggedInUserId === answer.userId) ?
                                                            <span>You</span> : this.state.question.displayName}</b>
                                                        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '5px' }}>
                                                            <b style={{ color: 'black' }}>{answer.points}&nbsp;points</b>&nbsp;
                                                            <img src={SilverMedal} alt='silver medal' />
                                                        </div>
                                                    </div>

                                                </div>
                                            </Link>

                                        </div>

                                    </div>
                                )


                            })
                        }


                    </div>

                </div>




                <div className='postAnswerMain_div'>
                    <h3 style={{ color: 'var(--blue-minded)', margin: '1rem 0rem' }}>Your answer:</h3>

                    <RichTextEditor value={this.state.body} onChange={this.onChange} />

                    <div style={{ margin: '1rem 0rem' }}>
                        <span onClick={() => this.postAnswer()} ><Button text='Post Answer' type='dark' size='medium' /></span>
                    </div>

                </div>

            </div>
        )
    }
}

export default EachQuestion