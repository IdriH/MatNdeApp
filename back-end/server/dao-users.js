import bcrypt from 'bcrypt'
import { Users } from '../db/schemas.js';
/**
 * Retrieves a user by username and checks if the password is correct.
 * @param {string} username - The username of the user to retrieve.
 * @param {string} password - The plaintext password to verify.
 * @returns {Promise<Object|false>} - The user object if verified, or false if not verified.
 */
export const getUser = async (username, password) => {
  try {
    const user = await Users.findOne({ username: username });
    if (!user) {
      return false; // User not found
    }

    // Compare provided password with hashed password in database
    const isMatch = await bcrypt.compare(password, user.hash);
    if (!isMatch) {
      return false; // Password does not match
    }

    // Password matches, return user data
    return {
      id: user._id,
      username: user.username,
      role: user.role,
    };
  } catch (error) {
    console.error('Error retrieving user:', error);
    throw error;
  }
};
