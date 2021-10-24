"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toUserDto = void 0;
const toUserDto = (data) => {
    const { id, firstName, email } = data;
    let userDto = { id, firstName, email, };
    return userDto;
};
exports.toUserDto = toUserDto;
//# sourceMappingURL=mapped.js.map