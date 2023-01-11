import styles from "../postId.module.css"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { commentEndPoint, userEndPoint } from "../../../utils/config.json";
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from "next/link"

// need to get user id
function NewComments({post, id, currUser}) {
    const [newCommentText, setNewCommentText] = useState("");
    const { user, error, isLoading } = useUser();

    console.log(id, "isssewfukn")

    if (isLoading) return <div className={styles.loading}>Loading...</div>;
    if (error) return <div>{error.message}</div>;

    function postComment(body, post_id) {
        axios.post(commentEndPoint, {
            body,
            upvotes: 0,
            commentor: currUser,
            post_id,
            user_id: id
        })
    }

    function handleSubmit() {
        postComment(newCommentText, post.data.id)
	}

    const handleChange = event => {
        setNewCommentText(event.target.value);
	}

    return (
        currUser != undefined ? (
            <div className={styles.newCommentContainer}>
                <div className={styles.newComment}>
                    <form onSubmit={handleSubmit}>
                        <label className={styles.newCommentLabel}>
                            Comment as: {currUser}
                        </label>
                        <textarea 
                            rows="5" 
                            cols="80" 
                            className={styles.text_input} 
                            placeholder="What are your thoughts?" 
                            type="text"
                            name="body"
                            onChange={handleChange}
                            value={newCommentText}
                            required 
                        />
                        <div className={styles.newCommentSubmit}>
                            <button className={styles.newCommentSubmitButton}>Comment</button>
                        </div>
                    </form>
                </div>
            </div>
        ) : (
            <div className={styles.newCommentContainer}>
                <div className={styles.notLoggedIn}>
                    <p className={styles.notLoggedInTitle}>Login to your account to leave comment and upvote!</p>
                    <button className={styles.notLoggedInLogin}>
                        <Link href="/profile">Log In!</Link>
                    </button>
                    <p className={styles.notLoggedInDesc}>Haven't registered?</p>
                    <button className={styles.notLoggedInRegister}>
                        <Link href="/profile">Register Now!</Link>
                    </button>
                </div>                
            </div>
        )
        
    )
}

export default NewComments
