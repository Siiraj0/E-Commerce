const usermodel = require("../../models/usermodel");

const userPage = async (req, res) => {
    try {
        const limit = 5;
        const page = parseInt(req.query.page) || 1;
        const skip = (page - 1) * limit;
        const searchQuery = req.query.query || '';
        const regex = new RegExp(searchQuery, 'i');

        const totalUsersCount = await usermodel.countDocuments({ name: regex });
        const totalPages = Math.ceil(totalUsersCount / limit);

        const userList = await usermodel.find({ name: regex }).skip(skip).limit(limit).sort({_id: -1});
        res.render("admin/user", { userList, totalPages, currentPage: page });
    } catch (error) {
        console.log(error.message);
    }
};

const blockUser = async (req, res) => {
    try {
        const userId = req.body.userId;
        const userData = await usermodel.findOne({ _id: userId });

        if (userData) {
            let updatedUserData;
            if (userData.isBlocked === false) {
                updatedUserData = await usermodel.findByIdAndUpdate(
                    userId,
                    { $set: { isBlocked: true } },
                    { new: true }
                );
            } else {
                updatedUserData = await usermodel.findByIdAndUpdate(
                    userId,
                    { $set: { isBlocked: false } },
                    { new: true }
                );
            }

            console.log("Updated user data:", updatedUserData);
            res.status(200).json({
                success: true,
                message: "User blocked/unblocked successfully",
                user: updatedUserData,
            });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const searchUser = async (req, res) => {
  try {
      const searchTerm = req.query.term;
      const regex = new RegExp(searchTerm, 'i'); // Case-insensitive search

      const users = await usermodel.find({
          name: { $regex: regex }
      }).limit(10); // Limit results if needed

      res.json(users);
  } catch (error) {
      console.error('Error searching users:', error);
      res.status(500).send({ error: 'Internal server error' });
  }
};
module.exports = {
    blockUser,
    userPage,
    searchUser // Export the new method
};
