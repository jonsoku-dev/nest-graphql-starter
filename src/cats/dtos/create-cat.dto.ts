import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CommonOutput } from '../../common/dtos/output.dto';
import { Cat } from '../entities/cat.entity';

@InputType()
export class CreateCatInput extends PickType(Cat, ['name']) {}

@ObjectType()
export class CreateCatOutput extends CommonOutput {}
