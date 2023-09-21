import styles from "./skeleton.module.css";

type Props = {
  classname?: string;
  width: number;
  height: number;
  unit: "px" | "%";
};

const Skeleton = (props: Props) => {
  return (
    <div
      style={{
        height: `${props.height}${props.unit}`,
        width: `${props.width}${props.unit}`,
      }}
      className={styles.skeleton}
    />
  );
};

export default Skeleton;
