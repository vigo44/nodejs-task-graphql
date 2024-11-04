import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { ContextType } from '../context.js';
import { ChangeUserInput, CreateUserInput, UserDtoType, UserType } from './user.js';
import { UUIDType } from './uuid.js';
import {
  ChangeProfileInput,
  CreateProfileInput,
  ProfileDtoType,
  ProfileType,
} from './profile.js';
import { ChangePostInput, CreatePostInput, PostDtotype, PostType } from './post.js';
import { SubscriberDtoType } from './subscribe.js';

type ArgCreateType<T> = {
  dto: T;
};

type ArgModifyType<T> = {
  dto: T;
  id: string;
};

type ArgDeleteType = {
  id: string;
};

export const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    createUser: {
      type: new GraphQLNonNull(UserType),
      args: { dto: { type: new GraphQLNonNull(CreateUserInput) } },
      resolve: async (_, args: ArgCreateType<UserDtoType>, context: ContextType) => {
        const user = await context.prisma.user.create({ data: args.dto });
        return user;
      },
    },
    changeUser: {
      type: new GraphQLNonNull(UserType),
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: new GraphQLNonNull(ChangeUserInput) },
      },
      resolve: async (_, args: ArgModifyType<UserDtoType>, context: ContextType) => {
        const user = await context.prisma.user.update({
          where: {
            id: args.id,
          },
          data: args.dto,
        });
        return user;
      },
    },

    deleteUser: {
      type: new GraphQLNonNull(GraphQLString),
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (_, args: ArgDeleteType, context: ContextType) => {
        await context.prisma.user.delete({
          where: {
            id: args.id,
          },
        });
        return true;
      },
    },

    createProfile: {
      type: new GraphQLNonNull(ProfileType),
      args: { dto: { type: new GraphQLNonNull(CreateProfileInput) } },
      resolve: async (_, args: ArgCreateType<ProfileDtoType>, context: ContextType) => {
        const profile = await context.prisma.profile.create({ data: args.dto });
        return profile;
      },
    },

    changeProfile: {
      type: new GraphQLNonNull(ProfileType),
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: new GraphQLNonNull(ChangeProfileInput) },
      },
      resolve: async (_, args: ArgModifyType<ProfileDtoType>, context: ContextType) => {
        return await context.prisma.profile.update({
          where: {
            id: args.id,
          },
          data: args.dto,
        });
      },
    },

    deleteProfile: {
      type: new GraphQLNonNull(GraphQLString),
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (_, args: ArgDeleteType, context: ContextType) => {
        await context.prisma.profile.delete({
          where: {
            id: args.id,
          },
        });
        return true;
      },
    },

    createPost: {
      type: new GraphQLNonNull(PostType),
      args: { dto: { type: new GraphQLNonNull(CreatePostInput) } },
      resolve: async (_, args: ArgCreateType<PostDtotype>, context: ContextType) => {
        const post = await context.prisma.post.create({ data: args.dto });
        return post;
      },
    },

    changePost: {
      type: new GraphQLNonNull(PostType),
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: new GraphQLNonNull(ChangePostInput) },
      },
      resolve: async (_, args: ArgModifyType<PostDtotype>, context: ContextType) => {
        const post = await context.prisma.post.update({
          where: {
            id: args.id,
          },
          data: args.dto,
        });
        return post;
      },
    },

    deletePost: {
      type: new GraphQLNonNull(GraphQLString),
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (_, args: ArgDeleteType, context: ContextType) => {
        await context.prisma.post.delete({
          where: {
            id: args.id,
          },
        });
        return true;
      },
    },

    subscribeTo: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        userId: { type: new GraphQLNonNull(UUIDType) },
        authorId: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_, args: SubscriberDtoType, context: ContextType) => {
        await context.prisma.subscribersOnAuthors.create({
          data: {
            subscriberId: args.userId,
            authorId: args.authorId,
          },
        });
        return true;
      },
    },

    unsubscribeFrom: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        userId: { type: new GraphQLNonNull(UUIDType) },
        authorId: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_, args: SubscriberDtoType, context: ContextType) => {
        await context.prisma.subscribersOnAuthors.delete({
          where: {
            subscriberId_authorId: {
              subscriberId: args.userId,
              authorId: args.authorId,
            },
          },
        });
        return true;
      },
    },
  }),
});
