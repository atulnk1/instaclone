import { useEffect } from "react";
import Header from "../components/Header";
import Modal from "../components/Header/Modal";
import SearchModal from "../components/Header/SearchModal";
import Myfollowingfeed from "../components/Myfollowingfeed";

export function MyFollowingDashboard() {
  useEffect(() => {
    document.title = "Instagram Clone";
  }, []);

  return (
    <div className="h-screen overflow-y-scroll scrollbar-hide">
      {/* <h1>This is the Instagram 2.0 build</h1> */}
      {/* Header */}
      <Header />

      {/* Feed */}
      <Myfollowingfeed />

      {/* Modal */}
      <Modal />
      <SearchModal />
    </div>
  );
}
