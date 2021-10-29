"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.IMutation = exports.IQuery = exports.Appointment = exports.UpdateUser = exports.NewUser = exports.FilterFindApptsByUser = exports.UpdateAppt = exports.NewAppt = exports.EnumUserRole = void 0;
var EnumUserRole;
(function (EnumUserRole) {
    EnumUserRole["DOCTOR"] = "DOCTOR";
    EnumUserRole["THERAPY"] = "THERAPY";
    EnumUserRole["CARE_MANAGER"] = "CARE_MANAGER";
})(EnumUserRole = exports.EnumUserRole || (exports.EnumUserRole = {}));
class NewAppt {
}
exports.NewAppt = NewAppt;
class UpdateAppt {
}
exports.UpdateAppt = UpdateAppt;
class FilterFindApptsByUser {
}
exports.FilterFindApptsByUser = FilterFindApptsByUser;
class NewUser {
}
exports.NewUser = NewUser;
class UpdateUser {
}
exports.UpdateUser = UpdateUser;
class Appointment {
}
exports.Appointment = Appointment;
class IQuery {
}
exports.IQuery = IQuery;
class IMutation {
}
exports.IMutation = IMutation;
class User {
}
exports.User = User;
//# sourceMappingURL=graphql.js.map