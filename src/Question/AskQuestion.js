import './AskQuestion.css'
import React, { Component } from "react";
import RichTextEditor from "react-rte";
import Button from '../components/Button';
import Loader from '../assets/Loader.gif'
import toast from 'react-hot-toast';
import { FcInfo } from 'react-icons/fc'
import { FiInfo } from 'react-icons/fi';
import questionService from '../services/questionService';
import loginService from '../services/loginService';


class AskQuestion extends Component {

    componentDidMount() {
        console.log('mount');
        (async () => {
            await questionService.getAllTags().then(
                (res) => {
                    this.setState({ allTags: res.data.tag.split(" ") })
                },
                (error) => {
                    this.setState({ allTags: [] })
                }
            )
        })();
    }
    componentDidUpdate() {
        console.log('updated');
    }
    state = {
        title: '',
        body: RichTextEditor.createEmptyValue(),
        keyValue: '',
        tags: [],
        filteredTags: [],
        isShowFilteredTags: false,
        allTags: [],
        isLoading: false,
        newTags: []
    };

    questionDTO = {
        questionId: '',
        userId: '',
        title: '',
        body: '',
        tags: ''
    }

    onChange = body => {
        this.setState({ body });
    };

    handleTitle = evt => {
        this.setState({ title: evt.target.value })
    }

    handleTags = evt => {
        this.setState({
            keyValue: evt.target.value,
            filteredTags: this.state.allTags.filter(tag =>
                (tag.includes(evt.target.value) && evt.target.value !== '') ? true : false)
        })

        if (this.state.filteredTags.length !== 0) {
            this.setState({ isShowFilteredTags: true })
        }
    }

    addToFilteredList = (tag) => {
        if (this.state.tags.find(f => f === tag) === undefined) {

            this.setState({ tags: [...this.state.tags, tag] })
            this.setState({ isShowFilteredTags: false })
        } else {
            toast((t) => (
                <span><FcInfo />&nbsp;tag already added</span>
            ))
        }

        console.log(this.state.tags);
        this.setState({ keyValue: '' });
    }

    addNewTag = () => {
        if (this.state.keyValue === '') {
            toast((t) => (
                <span><FcInfo />&nbsp;Please enter tag</span>
            ))
        } else if (this.state.tags.find(f => f === this.state.keyValue) === undefined) {
            this.setState({ tags: [...this.state.tags, this.state.keyValue], keyValue: '' })
        } else {
            toast((t) => (
                <span><FcInfo />&nbsp;tag already added</span>
            ))
        }

    }

    removeTag = tag => {
        this.setState({ tags: this.state.tags.filter((f) => f !== tag) })
    }


    onClick = () => {

        if (!loginService.isUserLogin()) {
            toast((t) => (
                <span><FiInfo />&nbsp;Please login</span>
            ))
            return;
        }

        if (this.state.title.trim() === ' ' || this.state.body.toString('html').trim() === '<p><br></p>') {
            toast((t) => (
                <span><FcInfo />&nbsp;&nbsp;Please enter question details</span>
            ))
        } else {
            this.questionDTO.title = this.state.title;
            this.questionDTO.body = this.state.body.toString('html');
            this.questionDTO.tags = this.state.tags.join(" ");
            this.questionDTO.userId = JSON.parse(localStorage.getItem("USER")).userId;
            this.setState({ isLoading: true })
            try {
                (async () => await questionService.postQuestion(this.questionDTO).then(
                    (res) => {
                        toast.success("question posted successfully");
                        this.setState({ isLoading: false })
                        this.setState({ title: '', body: RichTextEditor.createEmptyValue(), keyValue: '', tags: [] })

                        // filtering new tags to add
                        const tagsToBeAdded = []
                        this.questionDTO.tags.split(' ').forEach((tag) => {
                            if (this.state.allTags.find(f => f === tag) === undefined) {
                                tagsToBeAdded.push(tag)
                            }
                        })
                        //post tags to db
                        if (tagsToBeAdded.length !== 0) {

                            questionService.postNewTag({ tag: tagsToBeAdded.join(" ") }).then(
                                (res) => {
                                    console.log('tag added successfully');
                                }, (err) => {
                                    console.log('error in adding tag');
                                }
                            )
                        }


                        this.setState({ isLoading: false });

                    }, (error) => {
                        console.log('ERROR' + error);
                    }
                ).catch((ex) => {
                    toast.error('We are sorry for the trouble in posting the question, please try again.');
                    this.setState({ isLoading: false })
                }).finally(() => {
                    this.setState({ isLoading: false })
                })
                )();


                //adding new tag to db
                // const tagsToBeAdded = []
                // this.questionDTO.tags.split(' ').forEach((tag)=>{
                //     if(this.state.allTags.find(f => f===tag) === undefined){
                //         tagsToBeAdded.push(tag)
                //     }
                // })
                // post tags to db
                // (async()=>{
                //      await questionService.
                // })();


            } catch (e) {
                this.setState({ isLoading: false })
            }

        }
    }

    render() {
        return (
            <div className='askQuestionMain_div'>

                {
                    this.state.isLoading &&
                    <div id="loading">
                        <img id="loading-image" src={Loader} alt="Loading..." />
                    </div>
                }

                <div className='askQuestionTitle_div'>
                    <br />
                    <h3 style={{ color: 'var(--blue-minded)' }}><b>Question title:*</b></h3>
                    <input type="text" value={this.state.title} name='title' onChange={(evt) => this.handleTitle(evt)} placeholder='title here' />
                    <br />
                    <h3 style={{ color: 'var(--blue-minded)' }}><b>Question body:*</b></h3>
                </div>

                <RichTextEditor style={{ innerHeight: 500 }} value={this.state.body} onChange={this.onChange} />

                <div className='askQuestionTags_div'>
                    <span style={{ color: 'var(--blue-minded)', fontSize: '1rem' }}><b>Add tags to your question: <span style={{ fontSize: '.75rem' }}>(click on tag to remove)</span></b></span>
                    <br />



                    <div className='askQuestionSelectedTags_div'>
                        {
                            this.state.tags.map((tag, index) => {
                                return (
                                    <span onClick={() => this.removeTag(tag)} key={index}><Button text={tag} type="light" size="extra_small" /></span>
                                )
                            })
                        }

                    </div>

                    <div className='tagsInput_div'>

                        <input type='text' placeholder='search tags' name='keyValue' value={this.state.keyValue}
                            onChange={(evt) => this.handleTags(evt)} />
                        <span style={{ margin: '0px 5px' }} onClick={() => this.addNewTag()} ><Button text="Add tag" type="light" size="small" /></span>
                    </div>





                    {
                        this.state.isShowFilteredTags &&
                        <ul className='filteredTagsList_div'>
                            {
                                this.state.filteredTags.map((tag, index) => {
                                    return (
                                        <li onClick={() => this.addToFilteredList(tag)} className='eachFilteredTag' key={index}>{tag}</li>
                                    )
                                })
                            }

                        </ul>
                    }



                </div>

                <div className='postQuestionBtn_div'><span onClick={this.onClick} ><Button text="Post Question" type="dark" size="large" /></span></div>
            </div>
        );
    }
}

export default AskQuestion