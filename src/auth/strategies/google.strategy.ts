// Dependencies.
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

/**
 * A Passport strategy for authenticating with Google using the OAuth 2.0 API.
 */
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  /**
   * Creates an instance of GoogleStrategy.
   */
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ['email', 'profile'],
    });
  }

  /**
   * @async
   * @function
   * @description Validates the Google OAuth2 token.
   * @param {string} accessToken - The Google access token.
   * @param {string} refreshToken - The Google refresh token.
   * @param {object} profile - The user's Google profile.
   * @param {VerifyCallback} done - A callback function to call when validation is complete.
   * @returns {Promise<any>} - A Promise that resolves with the authenticated user object.
   */
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    try {
      const { name, emails, photos } = profile;

      // Set user's credentials.
      const user = {
        email: emails[0].value,
        firstName: name.givenName,
        lastName: name.familyName,
        picture: photos[0].value,
        accessToken,
      };
      
      // Success.
      return done(null, user);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      return done(error, false);
    }
  }
}
