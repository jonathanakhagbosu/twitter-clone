import { useRef, useState } from "react";
import { AiOutlineCalendar, AiOutlineClose } from "react-icons/ai";
import {
  HiOutlineChartBar,
  HiOutlineEmojiHappy,
  HiOutlinePhotograph,
} from "react-icons/hi";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { auth, db, storage } from "../firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

const Input = () => {
  const user = auth.currentUser;
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [showEmojis, setShowEmojis] = useState(false);
  const [loading, setLoading] = useState(false);
  const filePickerRef = useRef(null);

  const addEmoji = (e) => {
    console.log("I got clicked");
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setInput(input + emoji);
  };

  const sendPost = async () => {
    if (loading) return;
    setLoading(true);

    const docRef = await addDoc(collection(db, "posts"), {
      id: user.uid,
      username: user.displayName,
      tag: user.displayName.split(" ")[0],
      userImage: user.photoURL,
      text: input,
      timestamp: serverTimestamp(),
    });

    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    if (selectedFile) {
      await uploadString(imageRef, selectedFile, "data_url").then(async () => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });
      });
    }

    setLoading(false);
    setInput("");
    setSelectedFile(null);
    setShowEmojis(false);
  };

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  return (
    <div
      className={`border-b border-gray-700 p-3 flex space-x-3 ${
        loading && "opacity-60"
      }`}
    >
      <img
        src={user.photoURL}
        alt=""
        className="h-10 w-10 rounded-full cursor-pointer"
      />
      <div className="w-full divide-y divide-gray-700">
        <div className={`${selectedFile && "pb-7"} ${input && "space-y-2.5"}`}>
          <textarea
            placeholder="What's happening?"
            value={input}
            rows={2}
            onChange={(e) => setInput(e.target.value)}
            className="bg-transparent outline-none text-[#d9d9d9] text-lg placeholder-gray-500 tracking-wide min-h-[50px] w-[100%]"
          />
        </div>
        {selectedFile && (
          <div className="relative">
            <div className="absolute w-8 h-8 bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer ">
              <AiOutlineClose
                className="text-white h-4 w-4"
                onClick={() => setSelectedFile(null)}
              />
            </div>
            <img
              src={selectedFile}
              alt=""
              className="rounded-2xl max-h-80 object-contain"
            />
          </div>
        )}
        <div>
          {!loading && (
            <div className="flex items-center justify-between pt-2.5">
              <div className="flex items-center">
                <div
                  className="icon"
                  onClick={() => filePickerRef.current.click()}
                >
                  <HiOutlinePhotograph className="h-[22px] text-[#1d9bf0] " />
                  <input
                    type="file"
                    hidden
                    ref={filePickerRef}
                    onChange={addImageToPost}
                  />
                </div>

                <div className="icon rotate-90">
                  <HiOutlineChartBar className="text-[#1d9bf0]" />
                </div>

                <div
                  className="icon"
                  onClick={() => setShowEmojis(!showEmojis)}
                >
                  <HiOutlineEmojiHappy className="text-[#1d9bf0]" />
                </div>

                <div className="icon">
                  <AiOutlineCalendar className="text-[#1d9bf0]" />
                </div>

                {showEmojis && (
                  <div className="absolute mt-[465px] -ml-[40] max-w-[320px] border-r-[20px]">
                    <Picker data={data} theme="dark" onEmojiSelect={addEmoji} />
                  </div>
                )}
              </div>
              <button
                className="bg-[#1d9bf0] text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default"
                disabled={!input.trim() && !selectedFile}
                onClick={sendPost}
              >
                Tweet
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Input;
