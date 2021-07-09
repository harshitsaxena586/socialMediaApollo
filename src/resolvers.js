import { Post } from "./models/Post";
import { User } from "./models/User";
import { Notification } from "./models/Notification";
import addNewNotfication from "./utils/addNewNotifcation";
import removeNotification from "./utils/removeNotifcation";
export const resolvers = {
  // Posts: {},
  Query: {
    profile: async (_, {}, { user }) => {
      const toPopulate = await User.findById(user.id)
        .populate("following")
        .populate("followers")
        .populate("posts")
        .populate("notifications");
      toPopulate.password = "you are not authorized to query this field";
      return toPopulate;
    },

    user: async (_, { userId }) => {
      const userToFind = await User.findById(userId)
        .populate("followers")
        .populate("following");
      return userToFind;
    },
    posts: async (_, args) => {
      const posts = await Post.find()
        .populate("postedBy", { userName: 1 })
        .populate("likes", { userName: 1 });
      posts.reverse();
      return posts;
    },
    users: async () => {
      const users = await User.find().select("userName name");
      return users;
    },
    notifications: async (_, {}, { userId }) => {
      const notification = Notification.find();
      return notification;
    },
  },

  Mutation: {
    follow: async (_, { toFollow }, { user }) => {
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
      } else {
        userToFollow.followers.push(user.id); //adding the current client's Id to users followers list
        await userToFollow.save();
        user.following.push(userToFollow.id); //adding the userToFollow in clients following list
        await user.save();
        addNewNotfication(
          {
            content: `${user.userName} has started following you `,
            type: "FOLLOW",
          },
          { refUserId: user.id, userToSendNotification: userToFollow._id }
        );
        return "success true ";
      }
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
    updateLikes: async (_, { postId, clientuserName }, { id }) => {
      const post = await Post.findById(postId);
      const { likes } = post;
      const isPostLikedByUserEarlier = likes.find((likedBy) => likedBy == id);
      if (isPostLikedByUserEarlier) {
        post.likes = likes.filter((like) => like != id);
        await post.save();
        return "success true";
      } else {
        post.likes.push(id);
        await post.save();
        addNewNotfication(
          { content: `${clientuserName} liked your post `, type: "LIKE" },
          { postId, refUserId: id, userToSendNotification: post.postedBy }
        );
        return "success true";
      }
    },
    removeNotification: async (_, {}, { id }) => {
      await removeNotification(id);
      return "Success True";
    },
  },
};
