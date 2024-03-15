import NiceLookingBox from "../NiceLookingbox";

function HomePage() {
  return (
    <>
      <div className="context-page">
        <div className=" text-white font-bold text-9xl flex flex-col flex-end">
          <h1 className="justify-self-start">Home</h1>
        </div>
      </div>
      <NiceLookingBox>Hello</NiceLookingBox>
    </>
  );
}

export default HomePage;
