import { GraphQLBoolean, GraphQLInt, GraphQLObjectType, GraphQLString } from 'graphql';
import { UUIDType } from './uuid.js';
import { ContextType } from '../context.js';
import { MemberType } from './member.js';
import { MemberTypeId as MemberTypeIdType } from '../../member-types/schemas.js';

export const ProfileType = new GraphQLObjectType({
  name: 'Profile',
  fields: () => ({
    id: { type: UUIDType },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    memberTypeId: { type: GraphQLString },
    memberType: {
      type: MemberType,
      resolve: async (
        { memberTypeId }: { memberTypeId: MemberTypeIdType },
        _,
        context: ContextType,
      ) => {
        return await context.prisma.memberType.findUnique({
          where: { id: memberTypeId },
        });
      },
    },
  }),
});
