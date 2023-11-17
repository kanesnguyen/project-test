import { Passport } from 'passport';
import { Strategy as FacebookStrategy, StrategyOptionWithRequest } from 'passport-facebook';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import dotenv from 'dotenv';
import { Request } from 'express';
import UserModel from '@models/Users';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import settings from '@configs/settings';
import AdminModel from '@models/Admins';

dotenv.config();

const facebookOptionsForUser: StrategyOptionWithRequest = {
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_SECRET,
  callbackURL: `${process.env.FACEBOOK_OAUTH_CALLBACK_URL}`,
  passReqToCallback: true,
  profileFields: ['id', 'profileUrl', 'emails', 'name', 'photos', 'gender'],
};

const googleOptionsForUser: StrategyOptionWithRequest = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL: `${process.env.GOOGLE_OAUTH_CALLBACK_URL}`,
  passReqToCallback: true,
  profileFields: ['id', 'profileUrl', 'emails', 'name', 'photos', 'gender'],
};

const jwtOptionsForUser = {
  jwtFromRequest: ExtractJwt.fromExtractors([
    ExtractJwt.fromAuthHeaderAsBearerToken(),
  ]),
  secretOrKey: settings.jwt.secret,
  passReqToCallback: true,
};

const jwtOptionsForAdmin = {
  jwtFromRequest: ExtractJwt.fromExtractors([
    ExtractJwt.fromAuthHeaderAsBearerToken(),
  ]),
  secretOrKey: settings.jwt.secret,
  passReqToCallback: true,
};

const facebookStrategyForUser = new FacebookStrategy(facebookOptionsForUser, async (req: Request, accessToken, refreshToken, profile, next) => {
  try {
    const userDefaultAttributes: any = {
      facebookUserId: profile._json.id,
      fullName: `${profile._json.last_name} ${profile._json.middle_name} ${profile._json.first_name}`,
      email: profile._json.email,
    };
    let user = await UserModel.scope([{ method: ['byEmail', profile._json.email] }]).findOne();
    user ||= (await UserModel.findOrCreate({
      where: { facebookUserId: profile.id },
      defaults: userDefaultAttributes,
    }))[0];
    if (user.status === UserModel.STATUS_ENUM.INACTIVE) return next(null, null);
    await user.update({ facebookUserId: profile._json.id });
    req.currentUser = user;
    if (user) return next(null, user);
    next(null, false);
  } catch (error) {
    console.log(error);
  }
});

const googleStrategyForUser = new GoogleStrategy(googleOptionsForUser, async (req: Request, accessToken: any, refreshToken: any, profile: any, next: any) => {
  try {
    const userDefaultAttributes: any = {
      googleUserId: profile.id,
      fullName: `${profile.name.familyName || 'User'} ${profile.name.givenName || Math.floor(100000 + Math.random() * 900000)}`,
      email: profile.email,
    };
    let user = await UserModel.scope([{ method: ['byEmail', profile.email] }]).findOne();
    user ||= (await UserModel.findOrCreate({
      where: { googleUserId: profile.id },
      defaults: userDefaultAttributes,
    }))[0];
    if (user.status === UserModel.STATUS_ENUM.INACTIVE) return next(null, null);
    await user.update({ googleUserId: profile._json.id });
    req.currentUser = user;
    if (user) return next(null, user);
    next(null, false);
  } catch (error) {
    console.log(error);
  }
});

const jwtStrategyForUser = new JwtStrategy(jwtOptionsForUser, async (req: Request, payload: { id: number }, next: any) => {
  try {
    const user = await UserModel.scope([
      { method: ['byId', payload.id] },
      { method: ['byStatus', UserModel.STATUS_ENUM.ACTIVE] },
    ]).findOne();
    if (user) {
      req.currentUser = user;
      next(null, user);
    } else {
      next(null, false);
    }
  } catch (error) {
    console.log(error);
  }
});

const jwtStrategyForAdmin = new JwtStrategy(jwtOptionsForAdmin, async (req: Request, payload: { id: number }, next: any) => {
  try {
    const admin = await AdminModel.scope([
      { method: ['byId', payload.id] },
      { method: ['byStatus', AdminModel.STATUS_ENUM.ACTIVE] },
    ]).findOne();
    if (admin) {
      req.currentAdmin = admin;
      next(null, admin);
    } else {
      next(null, false);
    }
  } catch (error) {
    console.log(error);
  }
});

const userPassport = new Passport();
const adminPassport = new Passport();

userPassport.use(facebookStrategyForUser);
userPassport.use(googleStrategyForUser);
userPassport.use(jwtStrategyForUser);

adminPassport.use(jwtStrategyForAdmin);

export {
  userPassport,
  adminPassport,
};
