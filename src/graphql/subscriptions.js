/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment(
    $id: String
    $userId: String
    $text: String
    $date: AWSTimestamp
    $upvote: Int
  ) {
    onCreateComment(
      id: $id
      userId: $userId
      text: $text
      date: $date
      upvote: $upvote
    ) {
      id
      userId
      text
      date
      upvote
      downvote
    }
  }
`;
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment(
    $id: String
    $userId: String
    $text: String
    $date: AWSTimestamp
    $upvote: Int
  ) {
    onUpdateComment(
      id: $id
      userId: $userId
      text: $text
      date: $date
      upvote: $upvote
    ) {
      id
      userId
      text
      date
      upvote
      downvote
    }
  }
`;
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment(
    $id: String
    $userId: String
    $text: String
    $date: AWSTimestamp
    $upvote: Int
  ) {
    onDeleteComment(
      id: $id
      userId: $userId
      text: $text
      date: $date
      upvote: $upvote
    ) {
      id
      userId
      text
      date
      upvote
      downvote
    }
  }
`;
