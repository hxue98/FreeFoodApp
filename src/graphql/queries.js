/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getComment = /* GraphQL */ `
  query GetComment($id: String!) {
    getComment(id: $id) {
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
export const listComments = /* GraphQL */ `
  query ListComments(
    $filter: TableCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        eventId
        userId
        text
        date
        upvote
        downvote
      }
      nextToken
    }
  }
`;
export const getEvent = /* GraphQL */ `
  query GetEvent($eventId: String!) {
    getEvent(eventId: $eventId) {
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
export const listEvents = /* GraphQL */ `
  query ListEvents(
    $filter: TableEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
