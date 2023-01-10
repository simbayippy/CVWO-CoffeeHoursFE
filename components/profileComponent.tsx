import type { NextPage } from "next"
import Link from "next/link"
import React, { useState, useEffect }  from 'react';
import styles from "./profileComponent.module.css"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { isMounted } from "../hooks/isMounted"
import { useAccount } from "wagmi"
import { useUser } from '@auth0/nextjs-auth0/client';
import axios, { all } from 'axios';
import { postEndPoint, userEndPoint } from "../utils/config.json";
import PostCommon from "./postCommon";
import { isNull } from "util";

function ProfileComponent() {
    const mounted = isMounted();
	const { address, isConnected, isConnecting } = useAccount()
    const { user, error, isLoading } = useUser();
    const [allUsers, setAllUsers] = useState([]);
    const [allUserPosts, setAllUserPosts] = useState([]);
    const [allUserComments, setAllUserComments] = useState([]);


    // post user to DB if not ill never add user to userBase DB
    // check if user exists in DB already

    // to do this: for loop through existing db, if user exist, dont push, else push


    useEffect(() => {
        // axios.get(postEndPoint).then((response) => {
        //     setAllPost(response.data.data);
        // })
        var count = 0;
        axios.get(userEndPoint).then((response) => { 
            setAllUsers(response.data.data); // useState save list of ALL USERS
        })
        if (!isLoading && count <=1) { // only when auth0 useUser is done loading, then execute below
            count++;
            // NOW CHECKING IF USER EXISTS IN DB
            axios.get(userEndPoint + user?.nickname).then((response) => {
                // if username already exists in DB
                if (!isNull(response.data.data)) {
                    setAllUserPosts(response.data.included);
                    setAllUserComments(response.data.data.relationships.comments.data);
                    return null;
                }

                // here NEW account gets added to DB. they have no post or comments yet
                // so even if i fetch from DB, they have nothing to show for it.
                // they'll have to go to createPost page to create a post and hence when the come back
                // to profile page, will re render and call above code instead, and their posts will then show.
                axios.post(userEndPoint, {
                    username: user?.nickname
                }).then(response => {console.log("posted!")});
            })
        }
    }, []);

    // if (isConnecting) return <div>Loading...</div>;
    if (isLoading) return <div className={styles.loading}>Loading...</div>;
    if (error) return <div>{error.message}</div>;

    const userPostDisplyed = allUserPosts?.map(item => {
        return (
            <PostCommon post = {item} poster = {item.attributes.poster}/>
        )
    })

    return (
        <main className={styles.profileContainer}>
            <div className={styles.profileMain}>
                <h1 className={styles.profileTitle}>Profile Page</h1>
                <div className={styles.profileContent}>
                    <div className={styles.profileImgNLogout}>
                        <img src={`https://avatars.dicebear.com/api/miniavs/${user?.nickname}.svg?b=%23dfbfbf`} className={styles.profileImage}/>
                        <h2>username: {user?.nickname}</h2>
                        <Link href ='/api/auth/logout'>
                            <button className={styles.logoutBtn}>Logout</button>
                        </Link>  
                    </div>  
                    <div className={styles.profileStats}>
                        <p className={styles.profileStatsPosts}>Posts created: {allUserPosts.length}</p>
                        <p className={styles.profileStatsComments}>Comments made: {allUserComments.length}</p>
                    </div>
                </div>
            </div>
            <div className={styles.profilePosts}>
                <p className={styles.usersPost}>Your ({allUserPosts.length}) posts:</p>
                {userPostDisplyed}
            </div>
        </main>

    )
}

export default ProfileComponent