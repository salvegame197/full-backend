"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _mongoose = require('mongoose');
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

const UserSchema = new (0, _mongoose.Schema)(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    token: String,
    expiration: String,
  },
  {
    timestamps: true,
  }
);

UserSchema.pre('save', async function () {
  this.password = await _bcryptjs2.default.hash(this.password, 8);
});

UserSchema.methods.show = function () {
  return {
    _id: this._id,
    name: this.name,
    email: this.email,
    deleted: this.deleted,
  };
};

exports. default = _mongoose.model.call(void 0, 'User', UserSchema);
