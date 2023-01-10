import styles from "../postId.module.css"
import React, {useState} from 'react';
import {postEndPoint, commentEndPoint, tagEndPoint, userEndPoint} from "../../../utils/config.json";
import {isMounted} from "../../../utils/isMounted.js";
import axios from 'axios';
import Link from "next/link"
import { useUser } from '@auth0/nextjs-auth0/client';

// int param is used to determine if Post (0) or Comment (1) is in focus
// commentId, commentBody is only used for when comment is in focus
const Options = ({post, int, commentId, commentBody}) => {
    const mounted = isMounted(); // for hydration issue
    const [dropdown, setDropdown] = useState(false);
    const [edited, setEdited] = useState(false);
    const [confirmed, setConfirmed] = useState(false);

    const [editPostTitleText, setEditPostTitleText] = useState("");
	const [editDescText, setEditDescText] = useState("");


    const PostOrComment = () => {
        return int == 0 ? "post" : "comment" 
    }

    const handleChangeTitle = event => {
        setEditPostTitleText(event.target.value);
	}

    const handleChangeDesc = event => {
        setEditDescText(event.target.value);
	}

    function editPostOrComment(int, id) {
        if (int == 0) {
            axios.patch(postEndPoint + post.data.attributes.slug, {
                title: editPostTitleText,
                body: editDescText
            });
        } else {
            axios.patch(commentEndPoint + id, {
                body: editDescText
            });
        }
    }

    function deletePostOrComment(int, id) {
        if (int == 0) {
            <Link href ="/forum"/>
            axios.delete(postEndPoint + post.data.attributes.slug);
        } else {
            <Link href ={{pathname: "/posts/" + post.data.attributes.slug}}/>
            axios.delete(commentEndPoint + id);
        }
    }

    return (
        mounted ? (
        <div className={styles.options}>
            {/* options button */}
            <button className={styles.optionsButton} onClick={() => {
                setDropdown((prev) => !prev); 
                setEditPostTitleText(post.data.attributes.title);
                int == 0 
                    ? setEditDescText(post.data.attributes.body)
                    : setEditDescText(commentBody);
                }}
            >
                <img src="/options.png" alt="" className={styles.optionsImg}/>
            </button>
            {/* options dropdown content */}
            <div className={ dropdown ? styles.dropdownContentShow : styles.displayNone}>
                <a><button className={styles.dropdownContentButton} onClick={() => setEdited((prev) => !prev)}>Edit</button></a>
                <a><button className={styles.dropdownContentButton} onClick={() => setConfirmed((prev) => !prev)}>Delete</button></a>
            </div>

            {/* edit post/comment section */}
            <div className={edited ? styles.modalEdit : styles.displayNone}>
                <span className={styles.close} onClick={() => setEdited((prev) => !prev)}>&times;</span>
                <form className={styles.modalContent}>
                    <div className={styles.modalContainer}>
                        <h1 className={styles.modalTitle}>Edit {PostOrComment()}</h1>
                        <form>
                            {int == 0 ? 
                                <textarea 
                                    rows="1" 
                                    className={styles.modalEditTextInput} 
                                    placeholder="New post title" 
                                    type="text"
                                    name="body"
                                    onChange={handleChangeTitle}
                                    value={editPostTitleText}
                                />
                                : null
                            }
                            <textarea 
                                rows="3" 
                                className={styles.modalEditTextInput} 
                                placeholder={`New ${PostOrComment()} description`} 
                                type="text"
                                name="body"
                                onChange={handleChangeDesc}
                                value={editDescText}
                            />
                        </form>
                        <div className={styles.choices}>
                            <button className={styles.cancelbtn} onClick={() => setEdited((prev) => !prev)}>Cancel</button>
                            <button className={styles.deletebtn} onClick={() =>editPostOrComment(int, commentId)}>Edit</button>                                
                        </div>
                    </div>
                </form>
            </div>

            {/* delete post/comment section*/}
            <div className={confirmed ? styles.modal : styles.displayNone}>
                <span className={styles.close} onClick={() => setConfirmed((prev) => !prev)}>&times;</span>
                <form className={styles.modalContent}>
                    <div className={styles.modalContainer}>
                        <h1 className={styles.modalTitle}>Delete {PostOrComment()}</h1>
                        <p className={styles.modalDescription}>Are you sure you want to delete this {PostOrComment()}? You can't undo this.</p>

                        <div className={styles.choices}>
                            <button className={styles.cancelbtn} onClick={() => setConfirmed((prev) => !prev)}>Cancel</button>
                            {int == 0 ?
                                <Link href ="/forum"><button className={styles.deletebtn} onClick={() =>deletePostOrComment(int, commentId)}>Delete</button></Link>
                                :
                                <button className={styles.deletebtn} onClick={() =>deletePostOrComment(int, commentId)}>Delete</button>
                            }
                        </div>
                    </div>
                </form>
            </div>
        </div>
        ): null
    )
}

export default Options