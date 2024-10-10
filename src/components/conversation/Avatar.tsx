import Image from "next/image";
import avatarPlaceholder from "@/assets/avatar-placeholder.png";

const Avatar = () => {
  return (
    <div className="relative">
      <div className="relative inline-block h-9 w-9 overflow-hidden rounded-full md:h-11 md:w-11">
        <Image fill src={avatarPlaceholder} alt="Avatar" />
      </div>
    </div>
  );
};

export default Avatar;
