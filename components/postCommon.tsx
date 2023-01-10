import Link from "next/link"
import React, { useState, useEffect }  from 'react';
import styles from "./postCommon.module.css"
import {postEndPoint} from "../utils/config.json";
import axios from 'axios';
import { isNull } from "util";


// <img src={`https://avatars.dicebear.com/api/miniavs/${user?.nickname}.svg?b=%23dfbfbf`} alt={user?.name}  className={styles.profileImage}/>

function PostCommon({post, poster}) {
    const [user, setUser] = useState("");

    useEffect(() => {
        setUser(poster);
    }, []);

    return (
        <div className={styles.table}>
            <Link href={`/posts/${post.attributes.slug}`}>
                <div className={styles.tableContent}>
                    <div className={styles.tableHeader}>
                        <div className={styles.imageSection}>
                            <img src={`https://avatars.dicebear.com/api/miniavs/${user}.svg?b=%23dfbfbf`} className={styles.profileImage}/>
                            <p>{poster}</p>
                        </div>
                        <p className={styles.title}>
                            {post.attributes.title}
                        </p>
                        <p>
                            {/* {post.attributes.body} */}
                        </p>
                    </div>
                    <div className={styles.commentsAndUpvotes}>
                        <p className={styles.upvotes}>{post.attributes.upvotes} upvotes</p>
                        <p className={styles.comments}>{post.relationships.comments.data.length} comments</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default PostCommon