import { User } from "../models/User";

const removeNotification = async (userId) => {
  try {
    const user = await User.findById(userId);
    const emptyArr = [];
    user.notifications = emptyArr;
    await user.save();
    return { success: true };
  } catch (error) {
    console.log(error);
  }
};

export default removeNotification;
