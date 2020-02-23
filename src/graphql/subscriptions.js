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
  subscription OnUpdateComment($id: String, $upvote: Int, $downvote: Int) {
    onUpdateComment(id: $id, upvote: $upvote, downvote: $downvote) {
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
export const onCreateEvent = /* GraphQL */ `
  subscription OnCreateEvent(
    $eventId: String
    $posterId: String
    $longitude: Float
    $latitude: Float
    $startTime: AWSTimestamp
  ) {
    onCreateEvent(
      eventId: $eventId
      posterId: $posterId
      longitude: $longitude
      latitude: $latitude
      startTime: $startTime
    ) {
      eventId
      posterId
      longitude
      latitude
      startTime
      endTime
      description
      upvote
      downvote
    }
  }
`;
export const onUpdateEvent = /* GraphQL */ `
  subscription OnUpdateEvent(
    $eventId: String
    $posterId: String
    $longitude: Float
    $latitude: Float
    $startTime: AWSTimestamp
  ) {
    onUpdateEvent(
      eventId: $eventId
      posterId: $posterId
      longitude: $longitude
      latitude: $latitude
      startTime: $startTime
    ) {
      eventId
      posterId
      longitude
      latitude
      startTime
      endTime
      description
      upvote
      downvote
    }
  }
`;
export const onDeleteEvent = /* GraphQL */ `
  subscription OnDeleteEvent(
    $eventId: String
    $posterId: String
    $longitude: Float
    $latitude: Float
    $startTime: AWSTimestamp
  ) {
    onDeleteEvent(
      eventId: $eventId
      posterId: $posterId
      longitude: $longitude
      latitude: $latitude
      startTime: $startTime
    ) {
      eventId
      posterId
      longitude
      latitude
      startTime
      endTime
      description
      upvote
      downvote
    }
  }
`;
