/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createComment = /* GraphQL */ `
  mutation CreateComment($input: CreateCommentInput!) {
    createComment(input: $input) {
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
export const updateComment = /* GraphQL */ `
  mutation UpdateComment($input: UpdateCommentInput!) {
    updateComment(input: $input) {
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
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment($input: DeleteCommentInput!) {
    deleteComment(input: $input) {
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
export const createEvent = /* GraphQL */ `
  mutation CreateEvent($input: CreateEventInput!) {
    createEvent(input: $input) {
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
export const updateEvent = /* GraphQL */ `
  mutation UpdateEvent($input: UpdateEventInput!) {
    updateEvent(input: $input) {
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
export const deleteEvent = /* GraphQL */ `
  mutation DeleteEvent($input: DeleteEventInput!) {
    deleteEvent(input: $input) {
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
