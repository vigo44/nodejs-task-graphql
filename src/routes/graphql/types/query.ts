import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { MemberType, MemberTypeId } from './member.js';

import { ContextType } from '../context.js';
import { MemberTypeId as MemberTypeIdType } from '../../member-types/schemas.js';
import { UserType } from './user.js';
import { UUIDType } from './uuid.js';
import { ObjectIdType } from './objectId.js';
import { PostType } from './post.js';
import { ProfileType } from './profile.js';

export const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    memberTypes: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(MemberType))),
      resolve: async (_, __, context: ContextType) => {
        const result = await context.prisma.memberType.findMany();
        return result;
      },
    },
    memberType: {
      type: MemberType,
      args: {
        id: { type: new GraphQLNonNull(MemberTypeId) },
      },
      resolve: async (_, { id }: { id: MemberTypeIdType }, context) => {
        return context.prisma.memberType.findUnique({ where: { id } });
      },
    },
    users: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(UserType))),
      resolve: async (_, __, context) => {
        const users = await context.prisma.user.findMany();
        return users;
      },
    },
    user: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_, { id }: ObjectIdType, context) => {
        return context.prisma.user.findUnique({ where: { id } });
      },
    },
    posts: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(PostType))),
      resolve: async (_, __, context) => {
        const posts = await context.prisma.post.findMany();
        return posts;
      },
    },
    post: {
      type: PostType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_, { id }: ObjectIdType, context) => {
        return context.prisma.post.findUnique({ where: { id } });
      },
    },
    profiles: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(ProfileType))),
      resolve: async (_, __, context) => {
        const profiles = await context.prisma.profile.findMany();
        return profiles;
      },
    },
    profile: {
      type: ProfileType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_, { id }: ObjectIdType, context) => {
        return context.prisma.profile.findUnique({ where: { id } });
      },
    },
  }),
});
