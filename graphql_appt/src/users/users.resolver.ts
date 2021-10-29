import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { createUserDTO } from './dto/createUser.dto';
import { updateUserDTO } from './dto/updateUser.dto';

@Resolver()
export class UsersResolver {
    constructor(private readonly userService: UsersService) {}

    @Query('users')
    async posts() {
        return this.userService.users();
    }

    @Query('user')
    async post(@Args('id') args: string) {
        return this.userService.user(args);
    }

    @Mutation('createUser')
    async create(@Args('input') args: createUserDTO) {
        return this.userService.createUser(args);
    }

    @Mutation('updateUser')
    async update(@Args('input') args: updateUserDTO) {
        return this.userService.updateUser(args);
    }

    @Mutation('deleteUser')
    async delete(@Args('id') args: string) {
        return this.userService.deleteUser(args);
    }
}
