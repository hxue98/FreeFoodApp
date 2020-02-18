/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getComment = /* GraphQL */ `
  query GetComment($id: String!) {
    getComment(id: $id) {
      id
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
