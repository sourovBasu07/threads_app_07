"use server";

import Community from "../models/community.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";

export async function createCommunity(
  id: string,
  name: string,
  username: string,
  image: string,
  bio: string,
  createdById: string
) {
  try {
    connectToDB();

    const user = await User.findOne({ id: createdById });

    const newCommunity = new Community({
      id,
      name,
      username,
      image,
      bio,
      createdBy: user._id,
    });

    const createdCommunity = await newCommunity.save();

    user.communities.push(createdCommunity._id);

    return createdCommunity;
  } catch (error: any) {
    throw new Error(`Error creating community: ${error.message}`);
  }
}
