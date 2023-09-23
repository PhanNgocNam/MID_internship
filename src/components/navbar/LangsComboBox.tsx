import { FC } from "react";
import GlobeIcon from "../../assets/icons/GlobeIcon";
import { Dropdown } from "antd";
import type { MenuProps } from "antd";
import i18next from "i18next";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: (
      <div onClick={() => i18next.changeLanguage("en")}>
        <span className="mr-2 flag-icon flag-icon-gb flag-icon-squared"></span>
        English
      </div>
    ),
  },
  {
    key: "2",
    label: (
      <div onClick={() => i18next.changeLanguage("vi")}>
        {" "}
        <span className="mr-2 flag-icon flag-icon-vn flag-icon-squared"></span>
        Việt Nam
      </div>
    ),
  },
];

type Props = {
  className: string;
};

const LangsComboBox: FC<Props> = ({ className }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <Dropdown menu={{ items }} placement="bottomRight">
        <button>
          <GlobeIcon width={20} height={20} />
        </button>
      </Dropdown>
    </div>
  );
};

export default LangsComboBox;
