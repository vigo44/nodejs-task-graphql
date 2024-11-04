import {
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { ContextType } from '../context.js';
import { UUIDType } from './uuid.js';
import { ProfileType } from './profile.js';
import { ObjectIdType } from './objectId.js';
import { PostType } from './post.js';

export const UserType: GraphQLObjectType<{ id: string }, ContextType> =
  new GraphQLObjectType({
    name: 'User',
    fields: () => ({
      id: { type: new GraphQLNonNull(UUIDType) },
      name: { type: new GraphQLNonNull(GraphQLString) },
      balance: { type: new GraphQLNonNull(GraphQLFloat) },
      profile: {
        type: ProfileType,
        resolve: async ({ id }: ObjectIdType, _, context) => {
          const profile = await context.prisma.profile.findUnique({
            where: { userId: id },
          });
          return profile;
        },
      },
      posts: {
        type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(PostType))),
        resolve: async ({ id }: ObjectIdType, _, context) => {
          const post = await context.prisma.post.findMany({
            where: { authorId: id },
          });
          return post;
        },
      },
      userSubscribedTo: {
        type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(UserType))),
        resolve: async ({ id }: ObjectIdType, _, context) => {
          const subscriptions = (
            await context.prisma.subscribersOnAuthors.findMany({
              where: { subscriberId: id },
              include: { author: true },
            })
          ).map((item) => item.author);

          return subscriptions;
        },
      },

      subscribedToUser: {
        type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(UserType))),
        resolve: async ({ id }: ObjectIdType, _, context) => {
          const subscribers = await context.prisma.user.findMany({
            where: {
              userSubscribedTo: {
                some: {
                  authorId: id,
                },
              },
            },
          });
          return subscribers;
        },
      },
    }),
  });
