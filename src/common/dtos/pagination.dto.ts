import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Type } from '@nestjs/common';
import { CommonOutput } from './output.dto';

interface IEdgeType<T> {
  cursor: number;
  node: T;
}

export interface IPaginatedType<T> {
  edges?: IEdgeType<T>[];
  nodes?: T[];
  totalCount?: number;
  hasNextPage?: boolean;
}

export function Paginated<T>(
  classRef: Type<T>,
): Type<IPaginatedType<T> & CommonOutput> {
  @ObjectType(`${classRef.name}Edge`)
  abstract class EdgeType {
    @Field((type) => Number)
    cursor: number;

    @Field((type) => classRef)
    node: T;
  }

  @ObjectType({ isAbstract: true })
  abstract class PaginatedType
    extends CommonOutput
    implements IPaginatedType<T>
  {
    @Field((type) => [EdgeType], { nullable: true })
    edges: EdgeType[];

    @Field((type) => [classRef], { nullable: true })
    nodes: T[];

    @Field((type) => Int)
    totalCount: number;

    @Field()
    hasNextPage: boolean;
  }
  return PaginatedType as Type<IPaginatedType<T> & CommonOutput>;
}
