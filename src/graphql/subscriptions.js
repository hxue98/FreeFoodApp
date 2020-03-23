/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment(
    $date: AWSTimestamp
    $eventId: String!
    $id: String
    $text: String
    $userId: String
  ) {
    onCreateComment(
      date: $date
      eventId: $eventId
      id: $id
      text: $text
      userId: $userId
    ) {
      date
      downvote
      eventId
      id
      text
      upvote
      userId
    }
  }
`;
export const onCreateEvent = /* GraphQL */ `
  subscription OnCreateEvent(
    $eventId: String
    $latitude: Float
    $longitude: Float
    $posterId: String
    $startTime: AWSTimestamp
  ) {
    onCreateEvent(
      eventId: $eventId
      latitude: $latitude
      longitude: $longitude
      posterId: $posterId
      startTime: $startTime
    ) {
      description
      downvote
      endTime
      eventId
      latitude
      longitude
      posterId
      startTime
      upvote
      address
    }
  }
`;
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment(
    $date: AWSTimestamp
    $eventId: String!
    $id: String
    $text: String
    $userId: String
  ) {
    onDeleteComment(
      date: $date
      eventId: $eventId
      id: $id
      text: $text
      userId: $userId
    ) {
      date
      downvote
      eventId
      id
      text
      upvote
      userId
    }
  }
`;
export const onDeleteEvent = /* GraphQL */ `
  subscription OnDeleteEvent(
    $eventId: String
    $latitude: Float
    $longitude: Float
    $posterId: String
    $startTime: AWSTimestamp
  ) {
    onDeleteEvent(
      eventId: $eventId
      latitude: $latitude
      longitude: $longitude
      posterId: $posterId
      startTime: $startTime
    ) {
      description
      downvote
      endTime
      eventId
      latitude
      longitude
      posterId
      startTime
      upvote
      address
    }
  }
`;
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment($downvote: Int, $id: String, $upvote: Int) {
    onUpdateComment(downvote: $downvote, id: $id, upvote: $upvote) {
      date
      downvote
      eventId
      id
      text
      upvote
      userId
    }
  }
`;
export const onUpdateEvent = /* GraphQL */ `
  subscription OnUpdateEvent(
    $eventId: String
    $latitude: Float
    $longitude: Float
    $posterId: String
    $startTime: AWSTimestamp
  ) {
    onUpdateEvent(
      eventId: $eventId
      latitude: $latitude
      longitude: $longitude
      posterId: $posterId
      startTime: $startTime
    ) {
      description
      downvote
      endTime
      eventId
      latitude
      longitude
      posterId
      startTime
      upvote
      address
    }
  }
`;
export const onCreateAccount = /* GraphQL */ `
  subscription OnCreateAccount($userId: String, $password: String) {
    onCreateAccount(userId: $userId, password: $password) {
      userId
      password
    }
  }
`;
export const onUpdateAccount = /* GraphQL */ `
  subscription OnUpdateAccount($userId: String, $password: String) {
    onUpdateAccount(userId: $userId, password: $password) {
      userId
      password
    }
  }
`;
export const onDeleteAccount = /* GraphQL */ `
  subscription OnDeleteAccount($userId: String, $password: String) {
    onDeleteAccount(userId: $userId, password: $password) {
      userId
      password
    }
  }
`;
