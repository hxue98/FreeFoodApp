/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment(
    $id: String
    $eventId: String!
    $userId: String
    $text: String
    $date: AWSTimestamp
  ) {
    onCreateComment(
      id: $id
      eventId: $eventId
      userId: $userId
      text: $text
      date: $date
    ) {
      id
      eventId
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
    $eventId: String!
    $userId: String
    $text: String
    $date: AWSTimestamp
  ) {
    onUpdateComment(
      id: $id
      eventId: $eventId
      userId: $userId
      text: $text
      date: $date
    ) {
      id
      eventId
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
    $eventId: String!
    $userId: String
    $text: String
    $date: AWSTimestamp
  ) {
    onDeleteComment(
      id: $id
      eventId: $eventId
      userId: $userId
      text: $text
      date: $date
    ) {
      id
      eventId
      userId
      text
      date
      upvote
      downvote
    }
  }
`;
