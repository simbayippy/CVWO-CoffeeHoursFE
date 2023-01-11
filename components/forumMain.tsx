import type { NextPage } from "next"
import Link from "next/link"
import axios from 'axios';
import React, { useEffect, useState, Fragment} from 'react';
import styles from "./forumMain.module.css"
import { postEndPoint } from "../utils/config.json";
import PostCommon from "./postCommon";
import { isNull } from "util";

function ForumMain({int, filterNum}) {
    const [APIData, setAPIData] = useState([]);
    
    // INITIAL get from DB existing posts and comments
    useEffect(() => {
        axios.get(postEndPoint)
            .then((response) => {
                setAPIData(response.data.data)
            })
            .catch((response) => console.log(response, "hi"))
    }, [APIData.length]);

    // using data taken from DB and displaying it
    const list = APIData.map(item => {
        if (int == 0) {
            return (<PostCommon post = {item} poster = {item.attributes.poster}/>)
        } else if (int == 1) {
            // return only crypto tags TODO
            if (item.attributes.tag_id == 2) {
                return (<PostCommon post = {item} poster = {item.attributes.poster}/>)
            }
        } else if (int == 2) {
            if (item.attributes.tag_id == 3) {
                return (<PostCommon post = {item} poster = {item.attributes.poster}/>)
            }     
        } else if (int == 3) {
            if (item.attributes.tag_id == 4) {
                return (<PostCommon post = {item} poster = {item.attributes.poster}/>)
            }     
        } else {
            if (item.attributes.tag_id == 5) {
                return (<PostCommon post = {item} poster = {item.attributes.poster}/>)
            }     
        } 
    })


    function handleFilter(list, filterNum) {
        if (filterNum == 0) {
            // most popular
            return bubbleSort(list).reverse();
        } else if (filterNum == 1) {
            // most comments
            return bubbleSortComments(list);
        } else if (filterNum == 2) {
            // newest
            return bubbleSortTime(list).reverse();
        } else {
            //oldest
            return bubbleSortTime(list);
        }
    }
    
    function bubbleSort(list) {
        const A = list;
        const len = A.length;
        for (let i = len - 1; i >= 1; i = i - 1) {
            for (let j = 0; j < i; j = j + 1) {
                if (A[j] != null && A[j+1] != null) { // if post does not contain tag it will appear as null in list
                    if (A[j].props.post.attributes.upvotes > A[j + 1].props.post.attributes.upvotes) {
                        const temp = A[j];
                        A[j] = A[j + 1];
                        A[j + 1] = temp;
                    }
                }
            }
        }
        return A;
    }

    function bubbleSortComments(list) {
        const A = list;
        const len = A.length;
        for (let i = len - 1; i >= 1; i = i - 1) {
            for (let j = 0; j < i; j = j + 1) {
                if (A[j] != null && A[j+1] != null) { // if post does not contain tag it will appear as null in list
                    if (A[j].props.post.relationships.comments.data.length < A[j + 1].props.post.relationships.comments.data.length) {
                        const temp = A[j];
                        A[j] = A[j + 1];
                        A[j + 1] = temp;
                    }
                }
            }
        }
        return A;
    }

    function bubbleSortTime(list) {
        const A = list;
        const len = A.length;
        for (let i = len - 1; i >= 1; i = i - 1) {
            for (let j = 0; j < i; j = j + 1) {
                if (A[j] != null && A[j+1] != null) { // if post does not contain tag it will appear as null in list
                    // console.log(A[j], "ermm");
                    if (A[j].props.post.id > A[j + 1].props.post.id) {
                        var temp = A[j];
                        A[j] = A[j + 1];
                        A[j + 1] = temp;
                    }
                }
            }
        }
        return A
    }

    

    return (
        <Fragment>
            <div className={styles.container}>
                {handleFilter(list, filterNum)}
            </div>
        </Fragment>
    )
}

export default ForumMain