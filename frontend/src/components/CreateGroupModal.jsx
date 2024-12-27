import { useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { axiosInstance } from "../lib/axios";

const CreateGroupModal = ({ onClose }) => {
  const [groupName, setGroupName] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const { users } = useChatStore();

  const handleSubmit = async () => {
    try {
      await axiosInstance.post("/messages/groups", {
        name: groupName,
        members: selectedMembers,
      });
      onClose();
    } catch (error) {
      console.error("Error creating group:", error.message);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Create Group</h3>
        <input
          type="text"
          placeholder="Group Name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <select
          multiple
          onChange={(e) =>
            setSelectedMembers([...e.target.selectedOptions].map((o) => o.value))
          }
        >
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.fullName}
            </option>
          ))}
        </select>
        <button onClick={handleSubmit}>Create</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default CreateGroupModal;