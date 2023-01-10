import styles from "../postId.module.css"
import React, {useState} from 'react';
import Options from "./Options"
import axios from 'axios';
import {commentEndPoint} from "../../../utils/config.json";
import { useUser } from '@auth0/nextjs-auth0/client';    

function updateComment(id, upvotes) {
    axios.patch(commentEndPoint + id, {
        upvotes
    })
}

function CommentSection({post, currUser}) {
    const returnComments = post.included.map(item => {
        const [upvotedComment, setUpvoted] = useState(false);
        const [commentUpvoteCount, setCommentUpvoteCount] = useState(0);
        const { user, error, isLoading } = useUser();
        
        if (isLoading) return <div className={styles.loading}>Loading...</div>;
        function clickUpvoteComment() {
            if (upvotedComment) {
                // sends a patch to BE
                updateComment(item.id, commentUpvoteCount - 1);
                setCommentUpvoteCount(commentUpvoteCount - 1);
                setUpvoted(false)
            } else {
                updateComment(item.id, commentUpvoteCount + 1);
                setCommentUpvoteCount(commentUpvoteCount + 1);
                setUpvoted(true);
            }
        }
        return (
            <div className={styles.commentContainer}>
                <div className={styles.commentdiv}>
                    <div className={styles.CommentedBy}>
                        <img src={`https://avatars.dicebear.com/api/miniavs/${item.attributes.commentor}.svg?b=%23dfbfbf`} alt="" className={styles.profile_img} />
                        <p className={styles.postedByTxt}>{item.attributes.commentor}:</p>
                    </div>
                    <p className={styles.commentText}>
                        {item.attributes.body}
                    </p>
                    <div className={styles.commentUpvotes}>
                        <div className={styles.upvoteSectionComment}>
                            {/* to transition between upvote button images */}
                            {upvotedComment ? (
                                <button className={styles.upvoteButtonComment} onClick={clickUpvoteComment}>
                                    <img src="/upvoted.png" alt="" className={styles.upvoteComment}/>
                                </button>
                            ) : (
                                user?.nickname != undefined ? (
                                    <button className={styles.upvoteButtonComment} onClick={clickUpvoteComment}>
                                        <img src="/upvote.png" alt="" className={styles.upvoteComment}/>
                                    </button>
                                ) : (
                                    <button className={styles.upvoteButtonComment} disabled>
                                        <img src="/upvote.png" alt="" className={styles.upvote}/>
                                    </button>      
                                )
                            )}
                            <p className={`${styles.upvoteCountComment} ${upvotedComment && styles.upvoted}`}> {commentUpvoteCount}</p>
                        </div>
                    </div>
                </div>
                {/* {options(1, item.id, item.attributes.body)} */}
                {
                    item.attributes.commentor == currUser ? (
                        <Options post={post} int={1} commentId={item.id} commentBody={item.attributes.body}/>
                    ) : (
                        null
                    )
                }
            </div>
        )
    }).reverse()
    return returnComments;
}

export default CommentSection
