import { BsTwitter, BsBookmark } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import { FaHashtag, FaRegUser } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import {
  HiOutlineInbox,
  HiOutlineClipboardList,
  HiOutlineDotsCircleHorizontal,
} from "react-icons/hi";
import SidebarLink from "./SidebarLink";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { logout } from "../app/features/userSlice";
import { useDispatch } from "react-redux";

const Sidebar = () => {
  const dispatch = useDispatch();
  const user = auth.currentUser;

  const signOutUser = () => {
    dispatch(logout());
    signOut(auth);
  };

  return (
    <div className="hidden sm:flex flex-col items-center xl:items-start xl:w-[340px] p-1 fixed h-full text-sm">
      <div className="flex items-center justify-center w-14 h-14 hoverAnimation p-0 xl:ml-24">
        <BsTwitter className="text-white w-8 h-8" />
      </div>

      <div className="gap-y-2.5 mt-1.5 mb-2 xl:ml-24">
        <SidebarLink Icon={AiFillHome} text="Home" active />
        <SidebarLink Icon={FaHashtag} text="Explore" />
        <SidebarLink Icon={IoMdNotificationsOutline} text="Notifications" />
        <SidebarLink Icon={HiOutlineInbox} text="Messages" />
        <SidebarLink Icon={BsBookmark} text="Bookmarks" />
        <SidebarLink Icon={HiOutlineClipboardList} text="Lists" />
        <SidebarLink Icon={FaRegUser} text="Profile" />
        <SidebarLink Icon={HiOutlineDotsCircleHorizontal} text="More" />
      </div>

      <button className="hidden xl:inline ml-auto bg-[#1d9bf0] text-white rounded-full w-56 h-[52px] font-bold hover:bg-[#1a8cd8] ">
        Tweet
      </button>

      <div
        className="text-[#d9d9d9] flex items-center justify-center hoverAnimation xl:ml-auto mt-auto"
        onClick={signOutUser}
      >
        <img
          src={user?.photoURL}
          alt="profile-img"
          className="h-10 w-10 rounded-full xl:mr-2.5"
        />
        <div className="hidden xl:inline leading-5">
          <h4 className="font-bold">{user?.displayName.split(" ")[0]}</h4>
          <p className="text-[#6e767d] ">@{user?.displayName.split(" ")[0]}</p>
        </div>
        <HiOutlineDotsCircleHorizontal className="hidden h-7 w-7 xl:inline ml-10" />
      </div>
    </div>
  );
};

export default Sidebar;
