import { useEffect } from "react";
import Feed from "../components/Feed";
import Header from "../components/Header";
import Modal from "../components/Header/Modal";
import SearchModal from "../components/Header/SearchModal";

export default function Dashboard() {
  useEffect(() => {
    document.title = "Instagram Clone";
  }, []);

  return (
    <div className="h-screen overflow-y-scroll scrollbar-hide">
      {/* <h1>This is the Instagram 2.0 build</h1> */}
      {/* Header */}
      <Header />

      {/* Feed */}
      <Feed />

      {/* Modal */}
      <Modal />
      <SearchModal />
    </div>
  );
}
