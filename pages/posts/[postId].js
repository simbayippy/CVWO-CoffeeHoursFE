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
import isEmpty from "lodash.isempty";
import fetch from 'node-fetch';

export default function Post( {post} ) {  // post is taken from getStaticProps, is an object containing info of an individual Post
    
    // const post = props.post
    const { user, error, isLoading } = useUser();
    const [allUsers, setAllUsers] = useState([]);
    const [poster, setPoster] = useState("");
    const [userId, setUserId] = useState(0);
    console.log(post, "??")

    useEffect(() => {
        axios.get(userEndPoint).then((response) => { 
            setAllUsers(response.data.data); // useState save list of ALL USERS
            setPoster(post.data.attributes.poster);
            // console.log(user?.nickname, "nickname is")
        })
        if (user?.nickname != undefined) { //exists
            axios.get(userEndPoint + user?.nickname.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')).then(response=> {
                console.log(response,"HUE")
                setUserId(response.data.data.id);
                console.log(response.data.data.id)
            });
        }
    }, []);

    if (isLoading) return <div className={styles.loading}>Loading...</div>;

    //TODO. IF GUY ISNT LOGGED IN HOW?
    function getUserId() {
        if (user?.nickname != undefined) { //exists
            axios.get(userEndPoint + user?.nickname.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')).then(response=> {
                console.log(response,"HUE")
                setUserId(response.data.data.id);
                console.log(response.data.data.id)
            });
        } else {
            setUserId(0);
            return 0;
        }
    }

    // getUserId()


    function isPoster() {
        return user?.nickname == poster;
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
    
// export async function getServerSideProps({ params }) {
//                                     // params.postId gives the FORMATTED TITLE: to be able to grab from DB api
//     const post = await fetch(postEndPoint + params.postId).then(res => res.json());

//     return {
//         props: {
//             post
//         }
//     }
// }

export async function getServerSideProps({params}) {
    // Fetch data from external API
    const {postId} = params;
    const res = await fetch(`https://my-app-render-q45f.onrender.com/api/v1/posts/${postId}`);
    var post = await res.json()

    // Pass data to the page via props
    return { props: { post } }
}

// export const getStaticProps = async ({params}) => {
//     console.log(params, "HELLO")
//     let post = [];
//     let error = "";
//     try {
//       const res = await fetch(
//         postEndPoint + params.postId,
//         {
//           method: "GET",
//           headers: {
//             // update with your user-agent
//             "User-Agent":
//               "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36",
//             Accept: "application/json; charset=UTF-8",
//           },
//         }
//       );
  
//       if (res.status !== 200)
//         throw String(`Invalid server response: ${res.status} ${res.statusText}`);
  
//         post = await res.json();
  
//       if (isEmpty(post)) throw String("No data was found!");
  
//         post = JSON.parse(JSON.stringify(post));
//     } catch (e) {
//         error = e.toString();
//     }
  
//     return {
//       props: {
//         post,
//         error,
//       },
//     };
// };
  
// export async function getStaticPaths() {
//     var posts = await fetch(postEndPoint).then(res => res.json());
//     posts = posts.data; // change to array from object as map function only takes in array
//     // the variable posts contains the index (all posts as well as its comments), from the database
//     const paths = posts.map(item => {
//         // database is quireried based off slug.
//         const postId = item.attributes.slug;
//         return {
//             params: {
//                 postId
//             }
//         }
//     });

//     return {
//         paths, 
//         fallback: false
//     }
// }