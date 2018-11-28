export const typeDefs = /* GraphQL */ `type AggregatepushNotifications {
  count: Int!
}

type BatchPayload {
  count: Long!
}

scalar Long

type Mutation {
  createpushNotifications(data: pushNotificationsCreateInput!): pushNotifications!
  updatepushNotifications(data: pushNotificationsUpdateInput!, where: pushNotificationsWhereUniqueInput!): pushNotifications
  updateManypushNotificationses(data: pushNotificationsUpdateManyMutationInput!, where: pushNotificationsWhereInput): BatchPayload!
  upsertpushNotifications(where: pushNotificationsWhereUniqueInput!, create: pushNotificationsCreateInput!, update: pushNotificationsUpdateInput!): pushNotifications!
  deletepushNotifications(where: pushNotificationsWhereUniqueInput!): pushNotifications
  deleteManypushNotificationses(where: pushNotificationsWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type pushNotifications {
  id: ID!
  token: String!
  platform: String
  timezoneOffset: Int
  receiveNotifications: Boolean!
}

type pushNotificationsConnection {
  pageInfo: PageInfo!
  edges: [pushNotificationsEdge]!
  aggregate: AggregatepushNotifications!
}

input pushNotificationsCreateInput {
  token: String!
  platform: String
  timezoneOffset: Int
  receiveNotifications: Boolean
}

type pushNotificationsEdge {
  node: pushNotifications!
  cursor: String!
}

enum pushNotificationsOrderByInput {
  id_ASC
  id_DESC
  token_ASC
  token_DESC
  platform_ASC
  platform_DESC
  timezoneOffset_ASC
  timezoneOffset_DESC
  receiveNotifications_ASC
  receiveNotifications_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type pushNotificationsPreviousValues {
  id: ID!
  token: String!
  platform: String
  timezoneOffset: Int
  receiveNotifications: Boolean!
}

type pushNotificationsSubscriptionPayload {
  mutation: MutationType!
  node: pushNotifications
  updatedFields: [String!]
  previousValues: pushNotificationsPreviousValues
}

input pushNotificationsSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: pushNotificationsWhereInput
  AND: [pushNotificationsSubscriptionWhereInput!]
  OR: [pushNotificationsSubscriptionWhereInput!]
  NOT: [pushNotificationsSubscriptionWhereInput!]
}

input pushNotificationsUpdateInput {
  token: String
  platform: String
  timezoneOffset: Int
  receiveNotifications: Boolean
}

input pushNotificationsUpdateManyMutationInput {
  token: String
  platform: String
  timezoneOffset: Int
  receiveNotifications: Boolean
}

input pushNotificationsWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  token: String
  token_not: String
  token_in: [String!]
  token_not_in: [String!]
  token_lt: String
  token_lte: String
  token_gt: String
  token_gte: String
  token_contains: String
  token_not_contains: String
  token_starts_with: String
  token_not_starts_with: String
  token_ends_with: String
  token_not_ends_with: String
  platform: String
  platform_not: String
  platform_in: [String!]
  platform_not_in: [String!]
  platform_lt: String
  platform_lte: String
  platform_gt: String
  platform_gte: String
  platform_contains: String
  platform_not_contains: String
  platform_starts_with: String
  platform_not_starts_with: String
  platform_ends_with: String
  platform_not_ends_with: String
  timezoneOffset: Int
  timezoneOffset_not: Int
  timezoneOffset_in: [Int!]
  timezoneOffset_not_in: [Int!]
  timezoneOffset_lt: Int
  timezoneOffset_lte: Int
  timezoneOffset_gt: Int
  timezoneOffset_gte: Int
  receiveNotifications: Boolean
  receiveNotifications_not: Boolean
  AND: [pushNotificationsWhereInput!]
  OR: [pushNotificationsWhereInput!]
  NOT: [pushNotificationsWhereInput!]
}

input pushNotificationsWhereUniqueInput {
  id: ID
  token: String
}

type Query {
  pushNotifications(where: pushNotificationsWhereUniqueInput!): pushNotifications
  pushNotificationses(where: pushNotificationsWhereInput, orderBy: pushNotificationsOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [pushNotifications]!
  pushNotificationsesConnection(where: pushNotificationsWhereInput, orderBy: pushNotificationsOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): pushNotificationsConnection!
  node(id: ID!): Node
}

type Subscription {
  pushNotifications(where: pushNotificationsSubscriptionWhereInput): pushNotificationsSubscriptionPayload
}
`