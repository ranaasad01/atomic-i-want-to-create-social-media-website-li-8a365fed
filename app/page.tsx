import Navbar from "../components/layout/Navbar";
import LeftSidebar from "../components/layout/LeftSidebar";
import RightSidebar from "../components/layout/RightSidebar";
import MobileBottomNav from "../components/layout/MobileBottomNav";
import FeedList from "../components/feed/FeedList";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#F0F2F5]">
      <Navbar />
      <div className="flex pt-14">
        <LeftSidebar />
        <main className="flex-1 lg:ml-72 xl:mr-72 max-w-2xl mx-auto px-4 py-6 pb-20 md:pb-6">
          <FeedList />
        </main>
        <RightSidebar />
      </div>
      <MobileBottomNav />
    </div>
  );
}
