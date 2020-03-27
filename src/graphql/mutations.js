/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createComment = /* GraphQL */ `
  mutation CreateComment($input: CreateCommentInput!) {
    createComment(input: $input) {
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
export const createEvent = /* GraphQL */ `
  mutation CreateEvent($input: CreateEventInput!) {
    createEvent(input: $input) {
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
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment($input: DeleteCommentInput!) {
    deleteComment(input: $input) {
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
export const deleteEvent = /* GraphQL */ `
  mutation DeleteEvent($input: DeleteEventInput!) {
    deleteEvent(input: $input) {
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
export const updateComment = /* GraphQL */ `
  mutation UpdateComment($input: UpdateCommentInput!) {
    updateComment(input: $input) {
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
export const updateEvent = /* GraphQL */ `
  mutation UpdateEvent($input: UpdateEventInput!) {
    updateEvent(input: $input) {
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
export const createAccount = /* GraphQL */ `
  mutation CreateAccount($input: CreateAccountInput!) {
    createAccount(input: $input) {
      userId
      password
    }
  }
`;
export const updateAccount = /* GraphQL */ `
  mutation UpdateAccount($input: UpdateAccountInput!) {
    updateAccount(input: $input) {
      userId
      password
    }
  }
`;
export const deleteAccount = /* GraphQL */ `
  mutation DeleteAccount($input: DeleteAccountInput!) {
    deleteAccount(input: $input) {
      userId
      password
    }
  }
`;
export const createFeedback = /* GraphQL */ `
  mutation CreateFeedback($input: CreateFeedbackInput!) {
    createFeedback(input: $input) {
      feedbackId
      feedback
      contact
      userId
    }
  }
`;
export const updateFeedback = /* GraphQL */ `
  mutation UpdateFeedback($input: UpdateFeedbackInput!) {
    updateFeedback(input: $input) {
      feedbackId
      feedback
      contact
      userId
    }
  }
`;
export const deleteFeedback = /* GraphQL */ `
  mutation DeleteFeedback($input: DeleteFeedbackInput!) {
    deleteFeedback(input: $input) {
      feedbackId
      feedback
      contact
      userId
    }
  }
`;
