import bcrypt from "bcrypt";
import { User } from "../modules/user/user.model";
import { role } from "../modules/user/user.model";

const superAdminData = {
  fullName: "Admin",
  email: "admin@gmail.com",
  password: "123456",
  role: role.admin,
};

const seedSuperAdmin = async () => {
  try {
    const isSuperAdminExists = await User.findOne({
      role: role.admin,
    });

    if (!isSuperAdminExists) {
      const hashedPassword = await bcrypt.hash("123456", 12);

      superAdminData.password = hashedPassword;

      await User.create(superAdminData);
      console.log("🦸 Super Admin created successfully.");
    } else {
      return;
    }
  } catch (error) {
    console.error("Error seeding Super Admin:", error);
  }
};

export default seedSuperAdmin;
