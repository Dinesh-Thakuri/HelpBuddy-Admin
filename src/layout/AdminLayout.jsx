import SideBar from "../components/SideBar/SideBar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex bg-background w-full">
      <div className="  sticky bottom-0 left-0 top-0 h-screen w-1/6">
        <SideBar />
      </div>
      <div className=" w-5/6 p-5">{children}</div>
    </div>
  );
}
