import styles from "../postId.module.css"
import React, {useState, useEffect} from 'react';
import Options from "./Options"
import axios from 'axios';
import {postEndPoint} from "../../../utils/config.json";
import { useUser } from '@auth0/nextjs-auth0/client';    

function PostSection({post, isPoster, poster}) {
    const [upvoted, setUpvoted] = useState(false);
    const [upvoteCount, setUpvoteCount] = useState(0);
    const { user, error, isLoading } = useUser();

    useEffect(() => {
        axios.get(postEndPoint + post.data.attributes.slug)
            .then((response) => {
                setUpvoteCount(response.data.data.attributes.upvotes);
            })
    }, []);

    if (isLoading) return <div className={styles.loading}>Loading...</div>;

    function updatePost(slug, upvotes) {
        axios.patch(postEndPoint + slug, {
            upvotes
        })
    }

    // for tracking upvote
    function upvoteClick() {
        if (upvoted) {
            updatePost(post.data.attributes.slug, upvoteCount - 1);
            setUpvoteCount(upvoteCount - 1)
            setUpvoted(false)
        } else {
            updatePost(post.data.attributes.slug, upvoteCount + 1);
            setUpvoteCount(upvoteCount + 1)
            setUpvoted(true);
        }
    }

    return (
        <div className={styles.postContainer}>
            <div className={styles.postedBy}>
                <img src={`https://avatars.dicebear.com/api/miniavs/${poster}.svg?b=%23dfbfbf`} alt="" className={styles.profile_img} />
                <p className={styles.postedByTxt}>posted by: {poster}</p>
            </div>
            <div className={styles.titleHeader}>
                <h1 className={styles.postTitle}>{post.data.attributes.title}</h1>
                {/* {options(0, 0, "")} */} 
                {isPoster ? (
                    <Options post={post} int={0} commentId={0} commentBody={""}/>
                ) : (
                    null
                )}     
            </div>
            <p className={styles.postBody}>{post.data.attributes.body}</p>
            <div className={styles.upvoteSection}>
            {/* className={`${styles.card} ${txSuccess && styles.is_flipped}`} */}
                {upvoted ? (
                    <button className={styles.upvoteButton} onClick={upvoteClick}>
                        <img src="/upvoted.png" alt="" className={styles.upvote}/>
                    </button>
                ) : (
                    user?.nickname !=undefined ? (
                        <button className={styles.upvoteButton} onClick={upvoteClick}>
                            <img src="/upvote.png" alt="" className={styles.upvote}/>
                        </button>
                    ) : (
                        <button className={styles.upvoteButton} disabled>
                            <img src="/upvote.png" alt="" className={styles.upvote}/>
                        </button>      
                    )
                )}
                <p className={`${styles.upvoteCount} ${upvoted && styles.upvoted}`}> {upvoteCount}</p>
            </div>
        </div>
    )
}

export default PostSection
