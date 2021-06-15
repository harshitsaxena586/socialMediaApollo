import { Post } from "./models/Post";
import { User } from "./models/User";
import axios from "axios";
export const resolvers = {
  // Posts: {},
  Query: {
    profile: async (_, {}, { user }) => {
      const toPopulate = await User.findById(user.id)
        .populate("following")
        .populate("followers")
        .populate("posts");
      toPopulate.password = "you are not authorized to query this field";
      return toPopulate;
    },

    user: async (_, { userId }) => {
      const userToFind = await User.findById(userId)
        .populate("followers")
        .populate("following");
      userToFind.password = "you are not authorized to query this field";
      return userToFind;
    },
    posts: async (_, args, { user }) => {
      const Posts = await Post.find()
        .populate("postedBy", { userName: 1 })
        .populate("likes", { userName: 1 });
      return Posts;
    },
  },

  Mutation: {
    follow: async (_, { toFollow }, { user }) => {
      console.log("hits follow");
      const userToFollow = await User.findById(toFollow);
      const { followers } = userToFollow;
      const isUserToFollowAlreadyFollowed = followers.find(
        (followerId) => followerId == user.id //checking if the client follows this user
      );
      if (isUserToFollowAlreadyFollowed) {
        userToFollow.followers = followers.filter(
          (followerId) => followerId != user.id
        );
        await userToFollow.save();
        user.following = user.following.filter(
          (followerId) => followerId != toFollow
        );
        await user.save();
        return "success true ";
      } else userToFollow.followers.push(user.id); //adding the current client's Id to users followers list
      await userToFollow.save();
      user.following.push(userToFollow.id); //adding the userToFollow in clients following list
      await user.save();
      return "success true ";
    },

    addPost: async (_, { title, caption, public_id }, { id, user }) => {
      const newPost = new Post({
        postedBy: id,
        title: title,
        caption: caption,
        public_id: public_id,
        likes: [],
      });
      const savedPost = await newPost.save();
      user.posts.push(savedPost.id);
      await user.save();
      return "success true";
    },
    updateLikes: async (_, { postId }, { id }) => {
      const post = await Post.findById(postId);
      const { likes } = post;
      const isPostLikedByUserEarlier = likes.find((likedBy) => likedBy == id);
      if (isPostLikedByUserEarlier) {
        post.likes = likes.filter((like) => like != id);
        await post.save();
        return "success true";
      } else post.likes.push(id);
      await post.save();
      return "success true";
    },
  },
};
