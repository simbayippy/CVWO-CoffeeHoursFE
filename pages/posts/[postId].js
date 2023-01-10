import Head from "next/head"
import Layout from "../../components/Layout"
import styles from "./postId.module.css"
import { postEndPoint, userEndPoint } from "../../utils/config.json";
import NewComments from "./components/NewComments"
import PostSection from "./components/PostSection";
import CommentSection from "./components/CommentSection";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function Post( props ) {  // post is taken from getStaticProps, is an object containing info of an individual Post
    const post = props.post
    const { user, error, isLoading } = useUser();
    const [allUsers, setAllUsers] = useState([]);
    const [poster, setPoster] = useState("");
    const [userId, setUserId] = useState(0);

    useEffect(() => {
        axios.get(userEndPoint).then((response) => { 
            setAllUsers(response.data.data); // useState save list of ALL USERS
            setPoster(post.data.attributes.poster);
        })
    }, []);

    if (isLoading) return <div className={styles.loading}>Loading...</div>;


    function getUserId() {
        axios.get(userEndPoint + user?.nickname.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')).then(response=> {
            setUserId(response.data.data.id);
            console.log(response.data.data.id)
        });
    }

    getUserId();

    function isPoster() {
        return user?.nickname == poster
    }

    return (
      <div>
        <Head>
            <title>CoffeeHours</title>
            <link rel="icon" href="/favicon.ico" />   
        </Head>
        <Layout>
            <div className={styles.background}>
                <div className={styles.container}>
                    {/* POST */}
                    <PostSection post={post} isPoster={isPoster()} poster = {poster}/>

                    {/* NEW COMMENTS */}
                    <NewComments post = {post} id = {userId} currUser={user?.nickname}/>

                    {/* COMMENTS  */}
                    <div className={styles.comments}>
                        <CommentSection post={post} currUser={user?.nickname}/>
                    </div>
                </div>
            </div>
        </Layout>
      </div>
    )
}
    
export async function getStaticProps({ params }) {
                                    // params.postId gives the FORMATTED TITLE: to be able to grab from DB api
    const post = await fetch(postEndPoint + params.postId).then(res => res.json());

    return {
        props: {
            post
        }
    }
}
  
export async function getStaticPaths() {
    var posts = await fetch(postEndPoint).then(res => res.json());
    posts = posts.data; // change to array from object as map function only takes in array
    // the variable posts contains the index (all posts as well as its comments), from the database
    const paths = posts.map(item => {
        // database is quireried based off slug. 
        const postId = item.attributes.slug;
        return {
            params: {
                postId
            }
        }
    });

    return {
        paths, 
        fallback: false
    }
}