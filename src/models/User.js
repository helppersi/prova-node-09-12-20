const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
		},
		password: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		username: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

UserSchema.pre('save', async function (next) {
	if (this.password) {
		const hash = await bcrypt.hash(this.password, 10);

		this.password = hash;
	}

	next();
});

UserSchema.pre('findOneAndUpdate', async function (next) {
	if (this._update.password) {
		const hash = await bcrypt.hash(this._update.password, 10);

		this._update.password = hash;
	}

	next();
});

module.exports = model('User', UserSchema);
