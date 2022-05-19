import React, { useEffect, useState } from 'react'
import './Filter.css'
import { FcInfo } from 'react-icons/fc'
import Button from '../components/Button'
import toast from 'react-hot-toast';

function Filter({ tags, filterKeys, setFilterKeys, setIsFilterShow, filterQuestionsByTags
    , filterQuestionsByNewest, filterQuestionsByTopVoted, filterQuestionsByAnswered, filterQuestionByUnanswered
    , filterQuestionsByTopViewed }) {

    const [filteredTags, setFilteredTags] = useState([])
    const [isShowSearchedTags, setShowSearchedTags] = useState(false);

    const [keyValue, setKeyValue] = useState('');

    const removeFilter = (key) => {
        setFilterKeys(filterKeys.filter(f => f !== key))
    }

    const handleFilterChange = (evt) => {
        const value = evt.target.value;
        setKeyValue(value);
        setFilteredTags(tags.filter(tag =>
            (tag.includes(value) && value !== '') ? true : false))
        if (filteredTags.length !== 0) {
            setShowSearchedTags(true);
        }
    }

    const addToFilteredList = (tag) => {
        if (!filterKeys.find(t => t === tag)) {
            filterKeys.push(tag)
            setFilterKeys(filterKeys);
            setShowSearchedTags(false);
        } else {
            toast((t) => (
                <span><FcInfo />&nbsp;&nbsp;tag already added</span>
            ))
        }
        console.log(filterKeys);
    }

    useEffect(() => {
        console.log('effect-filter');
    }, [filterKeys, keyValue, filteredTags])

    return (
        <div className='filter_container'>
            <div className='filterByFixedKeywords_div'>

                <span onClick={() => filterQuestionsByNewest()}><Button text="new" type="light" size="small" /></span>
                <span onClick={() => filterQuestionsByTopVoted()}><Button text="top voted" type="light" size="small" /></span>
                <span onClick={() => filterQuestionsByAnswered()}><Button text="answered" type="light" size="small" /></span>
                <br />
                <span onClick={() => filterQuestionByUnanswered()}><Button text="unanswered" type="light" size="small" /></span>
                <span onClick={() => filterQuestionsByTopViewed()}><Button text="most viewed" type="light" size="small" /></span>

            </div>
            <div className='customFilter_div'>

                <span><b>search tags:</b>&nbsp;&nbsp;</span><span style={{ fontSize: '.75rem' }}>(click on tag to remove)</span>
                <div className='filterKeysShow_div'>
                    {filterKeys.map((key) => {
                        return (
                            <span onClick={() => removeFilter(key)} key={key}>
                                <Button text={key} size="extra_small" type="light" />
                            </span>
                        )
                    })}
                </div>

                <input onChange={(evt) => handleFilterChange(evt)} value={keyValue} type="text" name="filter_keys" placeholder="filter by tags" />




                {
                    isShowSearchedTags &&
                    <ul className='filteredTagsList_div'>
                        {
                            filteredTags.map((tag) => {
                                return (
                                    <li onClick={() => addToFilteredList(tag)} className='eachFilteredTag' key={tag}>{tag}</li>
                                )
                            })
                        }

                    </ul>
                }

                <div className='applyFilterBtn_div'>
                    <span onClick={() => {
                        setIsFilterShow(false)
                        filterQuestionsByTags()
                    }}><Button text="Apply Filter" type="dark" size="medium" /></span>
                </div>


            </div>


        </div>
    )
}

export default Filter