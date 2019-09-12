import React from 'react'
import { Card, CardContent, CardHeader, CardMeta, CardDescription } from 'semantic-ui-react';
import moment from 'moment';

import DeleteButton from './DeleteButton'

const CommentCard = ({comment, user, postId}) => {
    return (
        <Card fluid>
            <CardContent fluid>
            {user && user.username === comment.username && (
                <DeleteButton postId={postId} commentId={comment.id} />
            )}
                <CardHeader>{comment.username}</CardHeader>
                <CardMeta> {moment(comment.createdAt).fromNow()} </CardMeta>
                <CardDescription> {comment.body} </CardDescription>
            </CardContent>
        </Card>
    )
}

export default CommentCard
