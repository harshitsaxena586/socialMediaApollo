import { User } from "../models/User";
import { Notification } from "../models/Notification";
const addNotification = async (
  { content, type },
  { postId, userToSendNotification, refUserId }
) => {
  if (refUserId === userToSendNotification) {
    return null;
  }
  const newNotification = new Notification({
    postId: postId,
    refUserId: refUserId,
    type: type,
    content: content,
    isRead: false,
  });
  try {
    const savedNotification = await newNotification.save();
    const user = await User.findById(userToSendNotification);
    user.notifications.push(savedNotification._id);
    await user.save();
    return { success: true };
  } catch (error) {
    console.log(error);
  }
};

export default addNotification;
