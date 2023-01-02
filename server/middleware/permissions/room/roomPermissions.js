import cheackOwner from "./checkOwner.js";

const roomPermissions = {
  update: {
    roles: ["admin", "editor"],
    owner: cheackOwner,
  },
  delete: {
    roles: ["admin", "editor"],
    owner: cheackOwner,
  },
};
export default roomPermissions;
