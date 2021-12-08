import React from "react";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";

import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import Auth from '../utils/auth';

import { POST_DETAILS, ALL_POST_COMMENTS } from '../utils/queries';
//* THREAD_DETAILS requires threadId and gives us access to

import { REMOVE_POST, UPDATE_POST, UNPIN_POST, ADD_POST_REACTION, CREATE_POST_COMMENT, REMOVE_POST_COMMENT, UPDATE_POST_COMMENT, ADD_POST_COMMENT_REACTION } from '../utils/mutations';
//! Give description of imported mutations

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
};


function ThreadDisplay(props) {

    const { postId } = useParams();

    const singlePost = useQuery(POST_DETAILS, {
        variables: { postId: postId },
    });

    const allComments = useQuery(ALL_POST_COMMENTS, {
        variables: { postId: postId },
    });
    
    const errors = singlePost.error || allComments.error;
    const loading = singlePost.loading || allComments.loading;

    const [newComment, setNewComment] = React.useState('');
    // const [editComment, setEditComment] = React.useState('');

    if (loading) {
        return <p>loading...</p>;
    }

    return (
        <main className="thread-wrapper">
                <div className="thread-content-container">
                    <div className="top-panel">
                        <div className="thread-header">
                            <h3>
                                {singlePost.pinTitle}
                            </h3>
                        </div>
                        <div className="chats-container">
                            {errors && <h3 style={{ color: 'red' }}>{errors}</h3>}
                            <div className="chat subthread">
                                <div>
                                    <span className="chat-name">{singlePost.author}</span>
                                    <span className="chat-date">{singlePost.date_created}</span>
                                    <Link to={`/threads/${singlePost.thread._id}`}>
                                    Back to Thread
                                    </Link>
                                </div>
                                <p>{singlePost.post_text}</p>
                            </div>
                            {allComments.map((comment) => (
                                <div className="chat">
                                    <div>
                                        <span className="chat-name">{comment.author.username}</span>
                                        <span className="chat-date">{comment.date_created}</span>
                                    </div>
                                    <p>{comment.comment_text}</p>
                                </div>
                            ))}
                        </div>
                        <div className="chat-input">
                            <span contenteditable="true">"what's on your mind?"</span>
                            <div className="chat-input-buttons">
                                <button className="chat-input-send-button">send</button>
                            </div>
                        </div>
                    </div>
                </div>
        </main>
    )
}

export default ThreadDisplay;