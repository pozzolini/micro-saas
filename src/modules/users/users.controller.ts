import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'List all users' })
  @ApiOkResponse({ type: User, isArray: true })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Get user by id' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiOkResponse({ type: User })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiBadRequestResponse({ description: 'Invalid id' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @ApiOperation({ summary: 'Create a new user' })
  @ApiCreatedResponse({ type: User })
  @ApiConflictResponse({ description: 'Email already exists' })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Update an existing user' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiOkResponse({ type: User })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiConflictResponse({ description: 'Email already exists' })
  @ApiBadRequestResponse({ description: 'Invalid id' })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @ApiOperation({ summary: 'Delete user by id' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiOkResponse({ type: User })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiBadRequestResponse({ description: 'Invalid id' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
