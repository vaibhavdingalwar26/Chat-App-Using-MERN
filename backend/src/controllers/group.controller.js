import Group from "../models/group.model.js";

export const createGroup = async (req, res) => {
  const { name, members } = req.body;
  try {
    const newGroup = new Group({ name, members, admin: req.user._id });
    await newGroup.save();
    res.status(201).json(newGroup);
  } catch (error) {
    console.error("Error creating group:", error.message);
    res.status(500).json({ message: "Error creating group" });
  }
};

export const getGroups = async (req, res) => {
  try {
    const groups = await Group.find({ members: req.user._id });
    res.status(200).json(groups);
  } catch (error) {
    console.error("Error fetching groups:", error.message);
    res.status(500).json({ message: "Error fetching groups" });
  }
};

export const sendMessageToGroup = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  try {
    const group = await Group.findById(id);
    if (!group) return res.status(404).json({ message: "Group not found" });

    group.messages.push({ sender: req.user._id, text });
    await group.save();
    res.status(201).json(group);
  } catch (error) {
    console.error("Error sending message to group:", error.message);
    res.status(500).json({ message: "Error sending message" });
  }
};