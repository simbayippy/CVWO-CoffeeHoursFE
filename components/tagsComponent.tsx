import type { NextPage } from "next"
import Link from "next/link"
import React, { useState, useEffect }  from 'react';
import styles from "./tagsComponent.module.css"
import axios from 'axios';
import {tagEndPoint} from "../utils/config.json";
import ForumMain from "./forumMain";

function TagsComponent({isTagActive, int}) {
    const [tagsList, setTagsList] = useState([]);
    const [filterNum, setFilterNum] = useState(0); //by default 0. filtered by tio

	// const [isTagActive, setIsTagActive] = useState(false)

    useEffect(() => {
        // axios.get(postEndPoint).then((response) => {
        //     setAllPost(response.data.data);
        // })
        axios.get(tagEndPoint).then((response) => { 
            setTagsList(response.data.data);
        })
    }, []);
    
    var counter = 0;
    const tags = tagsList.map(item => {
        console.log("/forum" + item.attributes.name);
        counter++;
        return (
            <Link href={`/forum${item.attributes.name}`} className={`${styles.tag_item} ${isTagActive[counter-1] && styles.tag_active}`}>{item.attributes.name}</Link>
            // <button className={styles.tagbutton}>{item.attributes.name}</button>
        )
    })

    // this handling can be improved with event => ... but since its not a lot i've just hardcoded it
    function handleTop() {
        setFilterNum(0);
        console.log(filterNum)
    }

    function handleHot() {
        setFilterNum(1);
        console.log(filterNum)
    }

    function handleNewest() {
        setFilterNum(2);
        console.log(filterNum)
    }

    function handleOldest() {
        setFilterNum(3);
        console.log(filterNum)
    }

    return (
        <main className={styles.container}>
            <div className={styles.tagAndFilter}>
                <section className={styles.tags}>
                    {tags}
                </section>
                <section className={styles.filter}>
                    <button onClick={handleTop} className={styles.filterBtn}>Top</button>
                    <button onClick={handleHot} className={styles.filterBtn}>Hot</button>
                    <button onClick={handleNewest} className={styles.filterBtn}>Newest</button>
                    <button onClick={handleOldest} className={styles.filterBtn}>Oldest</button>
                </section>
            </div>
            <ForumMain int={int} filterNum={filterNum}/>
        </main>
    )
}

export default TagsComponent