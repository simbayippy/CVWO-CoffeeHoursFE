import type { NextPage } from "next"
import Link from "next/link"
import React, { useState, useEffect }  from 'react';
import styles from "./newPostComponent.module.css"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { isMounted } from "../hooks/isMounted"
import { useAccount } from "wagmi"
import { useUser } from '@auth0/nextjs-auth0/client';
import axios, { all } from 'axios';
import { postEndPoint, userEndPoint } from "../utils/config.json";
import PostCommon from "./postCommon";
import { isNull } from "util";

function NewPostComponent() {
    const mounted = isMounted();
	const { address, isConnected, isConnecting } = useAccount()
    const { user, error, isLoading } = useUser();
    const [newPostTitle, setNewPostTitle] = useState("");
    const [newPostBody, setNewPostBody] = useState("");
    const [tag, setTag] = useState(1);
    const [userId, setUserId] = useState(0);


    // if (isConnecting) return <div>Loading...</div>;
    if (isLoading) return <div className={styles.loading}>Loading...</div>;
    if (error) return <div>{error.message}</div>;

    useEffect(() => {
        axios.get(userEndPoint + user?.nickname.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')).then(response=> {
            setUserId(response.data.data.id);
        });
    }, []);

    function createPost(title, body) {
        axios.post(postEndPoint, {
            title: title,
            body: body,
            upvotes: 0,
            poster: user?.nickname,
            tag_id: tag,
            user_id: userId
        });
    }

    function handleSubmit() {
        createPost(newPostTitle, newPostBody)
	}

    const handleChange = event => {
        setNewPostTitle(event.target.value);
	}
    
    const handleChangeBody = event => {
        setNewPostBody(event.target.value)
    }

    function handleChangeTag(event) {
        if (event.target.value == "general") {
            setTag(1);
        } else if (event.target.value == "crypto") {
            setTag(2);
        } else if (event.target.value == "computing") {
            setTag(3);
        } else if (event.target.value == "university") {
            setTag(4);
        } else {
            setTag(5);
        }
    }
    function logValue() {
        console.log(tag);
    }
    return (
        <main className={styles.newPost}>
            <div className={styles.newPostContainer}/>
            <div className={styles.newPostContent}>
                <p className={styles.title}>New Post</p>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <textarea 
                        className={styles.titleInput} 
                        placeholder="Post title" 
                        type="text"
                        name="body"
                        onChange={handleChange}
                        value={newPostTitle}
                        required 
                    />
                    <textarea 
                        className={styles.bodyInput} 
                        placeholder="Post body" 
                        type="text"
                        name="body"
                        onChange={handleChangeBody}
                        value={newPostBody}
                        required 
                    />
                    <div className={styles.addTags}>
                        Category: 
                        <select id="subject" className={styles.dropDown} onChange={handleChangeTag}>
                            <option value="general">general</option>
                            <option value="crypto">crypto</option>
                            <option value="computing">computing</option>
                            <option value="university">university</option>
                            <option value="others">others</option>
                        </select>
                    </div>
                    <div className={styles.createPostSection}>
                        <button className={styles.createPostBtn} onClick={logValue}>Create Post!</button>
                    </div>
                </form>
            </div>
        </main>

    )
}

export default NewPostComponent