import { Cat } from "./models/Cat";
import { Post } from "./models/Post";

export const resolvers = {
  // Posts: {},
  Query: {
    hello(parent, args) {
      return "hello world";
      // return args.name;
    },
    posts: async () => {
      const Posts = await Post.find()
        .populate("postedBy", { userName: 1 })
        .populate("likes", { userName: 1 });
      return Posts;
    },
  },
  Mutation: {
    addPost: async (_, { title }) => {
      const newPost = new Post({
        postedBy: "60c11bff56584c39341f3650",
        title: title,
        caption: "Too much shit You know guys",
        likes: [],
      });
      newPost.save().then((savedpost) => {
        console.log(savedpost);
      });
      return "done boss";
    },
    books(parent, args) {
      const book = { title: args.title, author: args.author };
      books.concat(book);
      return book;
    },
    createCat: async (parent, { naam, maalik }) => {
      const kitty = new Cat({ naam, maalik });
      kitty.save().then((kitty) => console.log(kitty));
      return "done boss";
    },
    updateLikes: async (_, { postId }, { id }) => {
      const post = await Post.findById(postId);
      const { likes } = post;
      const isPostLikedByUserEarlier = likes.find((likedBy) => likedBy == id);
      if (isPostLikedByUserEarlier) {
        post.likes = likes.filter((like) => like != id);
        await post.save();
        return "done boss";
      } else post.likes.push(id);
      await post.save();
      return "done boss";
    },
  },
};
