/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getComment = /* GraphQL */ `
  query GetComment($id: String!) {
    getComment(id: $id) {
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
export const getEvent = /* GraphQL */ `
  query GetEvent($eventId: String!) {
    getEvent(eventId: $eventId) {
      description
      downvote
      endTime
      address
      eventId
      latitude
      longitude
      posterId
      startTime
      upvote
    }
  }
`;
export const listComments = /* GraphQL */ `
  query ListComments(
    $filter: TableCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        date
        downvote
        eventId
        id
        text
        upvote
        userId
      }
      nextToken
    }
  }
`;
export const listEvents = /* GraphQL */ `
  query ListEvents(
    $filter: TableEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        description
        downvote
        endTime
        address
        eventId
        latitude
        longitude
        posterId
        startTime
        upvote
      }
      nextToken
    }
  }
`;
export const getAccount = /* GraphQL */ `
  query GetAccount($userId: String!) {
    getAccount(userId: $userId) {
      userId
      password
    }
  }
`;
export const listAccounts = /* GraphQL */ `
  query ListAccounts(
    $filter: TableAccountFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAccounts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        userId
        password
      }
      nextToken
    }
  }
`;
