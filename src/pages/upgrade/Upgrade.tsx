// import { TypingProps } from "@types/react-typing-animation";

type Props = {};

const Upgrade = (props: Props) => {
  return (
    <div className="h-[100dvh] flex justify-center items-center">
      <div className="w-1/2">
        {localStorage.getItem("user") === "{}" ? (
          // <TypeAnimation
          //   sequence={["Vui lòng đăng nhập để sử dụng tính năng này", 1000]}
          //   wrapper="h1"
          //   speed={50}
          //   style={{
          //     fontSize: ".6em",
          //     display: "inline-block",
          //     lineHeight: 0,
          //   }}
          //   repeat={Infinity}
          // />
          <h1 className="text-white">
            Vui lòng đăng nhập để sử dụng tính năng này
          </h1>
        ) : (
          <img
            src="https://media0.giphy.com/media/iTWomlMFQXIA5DN0VZ/giphy.gif?cid=ecf05e47ex26o2xdo841n5tb0cn5yddw981bnx8ww5clqm1p&ep=v1_gifs_search&rid=giphy.gif&ct=g"
            alt="Comming soon..."
          />
        )}
      </div>
    </div>
  );
};

export default Upgrade;
